import { supabase } from '../lib/supabase'
import type { CVIResult } from './cviCalculator'
import type { Formula } from './formulaService'
import type { Parameter } from './parameterService'
import type { MapFeature } from '../types'

export interface StoredResult {
  id: string
  userId: string
  name: string
  description?: string
  uploadDate: Date
  shorelineId: string
  parameters: Parameter[]
  formula: Formula
  result: CVIResult
  metadata?: {
    vulnerabilityClasses?: number
    segmentCount?: number
    calculationTime?: number
  }
}

export interface ResultsQuery {
  userId: string
  shorelineId?: string
  startDate?: Date
  endDate?: Date
  limit?: number
  offset?: number
}

export interface ResultsSummary {
  totalResults: number
  shorelineData: {
    id: string
    name: string
    resultCount: number
  }[]
  formulaData: {
    id: string
    name: string
    usageCount: number
  }[]
  recentResults: StoredResult[]
}

interface ShorelineCount {
  shoreline_id: string
  shoreline_name: string | null
  count: string
}

interface FormulaCount {
  formula_id: string
  formula_name: string | null
  count: string
}

export async function storeResult(
  userId: string,
  result: CVIResult,
  name: string,
  description?: string,
  metadata?: StoredResult['metadata']
): Promise<StoredResult> {
  const { data, error } = await supabase
    .from('results')
    .insert({
      user_id: userId,
      name,
      description,
      upload_date: new Date().toISOString(),
      shoreline_id: (result.shoreline.features[0] as MapFeature).properties.id,
      parameters: result.segments[0].parameters,
      formula: result.formula,
      result: result,
      metadata
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to store result: ${error.message}`)
  }

  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    description: data.description,
    uploadDate: new Date(data.upload_date),
    shorelineId: data.shoreline_id,
    parameters: data.parameters,
    formula: data.formula,
    result: data.result,
    metadata: data.metadata
  }
}

export async function fetchResults(query: ResultsQuery): Promise<StoredResult[]> {
  let supabaseQuery = supabase
    .from('results')
    .select('*')
    .eq('user_id', query.userId)
    .order('upload_date', { ascending: false })

  if (query.shorelineId) {
    supabaseQuery = supabaseQuery.eq('shoreline_id', query.shorelineId)
  }

  if (query.startDate) {
    supabaseQuery = supabaseQuery.gte('upload_date', query.startDate.toISOString())
  }

  if (query.endDate) {
    supabaseQuery = supabaseQuery.lte('upload_date', query.endDate.toISOString())
  }

  if (query.limit) {
    supabaseQuery = supabaseQuery.limit(query.limit)
  }

  if (query.offset) {
    supabaseQuery = supabaseQuery.range(query.offset, query.offset + (query.limit ?? 10) - 1)
  }

  const { data, error } = await supabaseQuery

  if (error) {
    throw new Error(`Failed to fetch results: ${error.message}`)
  }

  return data.map(result => ({
    id: result.id,
    userId: result.user_id,
    name: result.name,
    description: result.description,
    uploadDate: new Date(result.upload_date),
    shorelineId: result.shoreline_id,
    parameters: result.parameters,
    formula: result.formula,
    result: result.result,
    metadata: result.metadata
  }))
}

export async function getResultById(userId: string, resultId: string): Promise<StoredResult> {
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .eq('id', resultId)
    .eq('user_id', userId)
    .single()

  if (error) {
    throw new Error(`Failed to fetch result: ${error.message}`)
  }

  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    description: data.description,
    uploadDate: new Date(data.upload_date),
    shorelineId: data.shoreline_id,
    parameters: data.parameters,
    formula: data.formula,
    result: data.result,
    metadata: data.metadata
  }
}

export async function deleteResult(userId: string, resultId: string): Promise<boolean> {
  const { error } = await supabase
    .from('results')
    .delete()
    .eq('id', resultId)
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to delete result: ${error.message}`)
  }

  return true
}

export async function getResultsSummary(userId: string): Promise<ResultsSummary> {
  // Get total results count
  const { count: totalResults, error: countError } = await supabase
    .from('results')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (countError) {
    throw new Error(`Failed to get results count: ${countError.message}`)
  }

  // Get shoreline counts
  const { data: shorelineCounts, error: shorelineError } = await supabase
    .from('results')
    .select('shoreline_id, shoreline_name:shorelines(name), count')
    .eq('user_id', userId)
    .group('shoreline_id, shorelines.name')

  if (shorelineError) {
    throw new Error(`Failed to get shoreline counts: ${shorelineError.message}`)
  }

  // Get formula counts
  const { data: formulaCounts, error: formulaError } = await supabase
    .from('results')
    .select('formula_id, formula_name:formulas(name), count')
    .eq('user_id', userId)
    .group('formula_id, formulas.name')

  if (formulaError) {
    throw new Error(`Failed to get formula counts: ${formulaError.message}`)
  }

  // Get recent results
  const { data: recentResults, error: recentError } = await supabase
    .from('results')
    .select('*')
    .eq('user_id', userId)
    .order('upload_date', { ascending: false })
    .limit(5)

  if (recentError) {
    throw new Error(`Failed to get recent results: ${recentError.message}`)
  }

  return {
    totalResults: totalResults ?? 0,
    shorelineData: (shorelineCounts as ShorelineCount[]).map(count => ({
      id: count.shoreline_id,
      name: count.shoreline_name ?? 'Unknown Shoreline',
      resultCount: parseInt(count.count)
    })),
    formulaData: (formulaCounts as FormulaCount[]).map(count => ({
      id: count.formula_id,
      name: count.formula_name ?? 'Unknown Formula',
      usageCount: parseInt(count.count)
    })),
    recentResults: recentResults.map(result => ({
      id: result.id,
      userId: result.user_id,
      name: result.name,
      description: result.description,
      uploadDate: new Date(result.upload_date),
      shorelineId: result.shoreline_id,
      parameters: result.parameters,
      formula: result.formula,
      result: result.result,
      metadata: result.metadata
    }))
  }
}

export async function exportResults(results: StoredResult[]): Promise<Blob> {
  const exportData = results.map(result => ({
    id: result.id,
    name: result.name,
    description: result.description,
    uploadDate: result.uploadDate.toISOString(),
    shorelineId: result.shorelineId,
    parameters: result.parameters,
    formula: result.formula,
    result: result.result,
    metadata: result.metadata
  }))

  return new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json'
  })
} 