import { supabase } from '../lib/supabase'
import type { ShorelineData, AnalysisResult, Parameter, Formula } from '../types'

export async function uploadShoreline(data: Omit<ShorelineData, 'id' | 'createdAt' | 'updatedAt'>) {
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

export async function getShoreline(id: string) {
  const { data: shoreline, error } = await supabase
    .from('shorelines')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return shoreline
}

export async function listShorelines(userId: string) {
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

export async function deleteShoreline(id: string, userId: string) {
  const { error } = await supabase
    .from('shorelines')
    .delete()
    .eq('id', id)
    .eq('userId', userId)

  if (error) {
    throw error
  }
}

export async function saveAnalysisResult(data: Omit<AnalysisResult, 'id' | 'createdAt' | 'updatedAt'>) {
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

export async function listAnalysisResults(userId: string) {
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

export async function deleteAnalysisResult(id: string, userId: string) {
  const { error } = await supabase
    .from('analysis_results')
    .delete()
    .eq('id', id)
    .eq('userId', userId)

  if (error) {
    throw error
  }
}

export async function saveParameters(shorelineId: string, parameters: Parameter[]) {
  const { error } = await supabase
    .from('parameters')
    .upsert(
      parameters.map(param => ({
        ...param,
        shorelineId
      }))
    )

  if (error) {
    throw error
  }
}

export async function getParameters(shorelineId: string) {
  const { data: parameters, error } = await supabase
    .from('parameters')
    .select('*')
    .eq('shorelineId', shorelineId)

  if (error) {
    throw error
  }

  return parameters
}

export async function getFormulas() {
  const { data: formulas, error } = await supabase
    .from('formulas')
    .select('*')

  if (error) {
    throw error
  }

  return formulas as Formula[]
}

export async function uploadFile(path: string, file: File) {
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw error
  }

  return data
}

export async function downloadFile(path: string) {
  const { data, error } = await supabase.storage
    .from('uploads')
    .download(path)

  if (error) {
    throw error
  }

  return data
}

export async function deleteFile(path: string) {
  const { error } = await supabase.storage
    .from('uploads')
    .remove([path])

  if (error) {
    throw error
  }
} 