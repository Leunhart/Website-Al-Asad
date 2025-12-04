'use server'

import { supabase } from '../lib/supabase'
import { Equipment } from '../types/database'

export type NewEquipmentInput = {
  name: string
  type: string
  quantity: number
  condition: string
  location: string
  id_academies?: number | null
}

export type UpdateEquipmentInput = {
  name?: string
  type?: string
  quantity?: number
  condition?: string
  location?: string
  id_academies?: number | null
}

export async function getEquipment(): Promise<Equipment[]> {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching equipment:', error)
      return []
    }

    return data as Equipment[]
  } catch (error) {
    console.error('Unexpected error fetching equipment:', error)
    return []
  }
}

export async function getEquipmentById(id: number): Promise<Equipment | null> {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id_equipment', id)
      .single()

    if (error) {
      console.error('[getEquipmentById] error:', error)
      return null
    }

    return data as Equipment
  } catch (error) {
    console.error('[getEquipmentById] unexpected error:', error)
    return null
  }
}

export async function createEquipment(
  input: NewEquipmentInput,
): Promise<Equipment | null> {
  try {
    const payload = {
      name: input.name,
      type: input.type,
      quantity: input.quantity,
      condition: input.condition,
      location: input.location,
      id_academies: input.id_academies ?? null,
    }

    const { data, error } = await supabase
      .from('equipment')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createEquipment] error:', error)
      return null
    }

    return data as Equipment
  } catch (error) {
    console.error('[createEquipment] unexpected error:', error)
    return null
  }
}

export async function updateEquipment(
  id: number,
  input: UpdateEquipmentInput,
): Promise<Equipment | null> {
  try {
    const updatePayload: Partial<Equipment> = {}

    if (typeof input.name !== 'undefined') updatePayload.name = input.name
    if (typeof input.type !== 'undefined') updatePayload.type = input.type
    if (typeof input.quantity !== 'undefined') updatePayload.quantity = input.quantity
    if (typeof input.condition !== 'undefined') updatePayload.condition = input.condition
    if (typeof input.location !== 'undefined') updatePayload.location = input.location
    if (typeof input.id_academies !== 'undefined') updatePayload.id_academies = input.id_academies ?? null

    const { data, error } = await supabase
      .from('equipment')
      .update(updatePayload)
      .eq('id_equipment', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateEquipment] error:', error)
      return null
    }

    return data as Equipment
  } catch (error) {
    console.error('[updateEquipment] unexpected error:', error)
    return null
  }
}

export async function deleteEquipment(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('equipment')
      .delete()
      .eq('id_equipment', id)

    if (error) {
      console.error('[deleteEquipment] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteEquipment] unexpected error:', error)
    return false
  }
}