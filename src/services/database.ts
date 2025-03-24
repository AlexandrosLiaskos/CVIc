import { supabase } from '../lib/supabase'
import type { ShorelineData, AnalysisResult } from '../types'

export async function createShoreline(data: Omit<ShorelineData, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data: shoreline, error } = await supabase
    .from('shorelines')
    .insert([data])
    .select()
    .single()

  if (error) {
    throw error
  }

  return shoreline
}

export async function getShorelines(userId: string) {
  const { data: shorelines, error } = await supabase
    .from('shorelines')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })

  if (error) {
    throw error
  }

  return shorelines
}

export async function createAnalysisResult(data: Omit<AnalysisResult, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data: result, error } = await supabase
    .from('analysis_results')
    .insert([data])
    .select()
    .single()

  if (error) {
    throw error
  }

  return result
}

export async function getAnalysisResults(userId: string) {
  const { data: results, error } = await supabase
    .from('analysis_results')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })

  if (error) {
    throw error
  }

  return results
}

export async function getAnalysisResult(id: string) {
  const { data: result, error } = await supabase
    .from('analysis_results')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return result
} 