import { describe, it, expect, beforeAll } from 'vitest'
import { getQuestions } from '../services/question-service.js'

describe('question-service - REAL API TESTS', () => {

    let questionsData = null

    beforeAll(async () => {
        console.log('🌐 Llamando a la API real una sola vez...')
        questionsData = await getQuestions()
        console.log(`📊 Obtenidas ${questionsData?.length || 0} preguntas`)
    }, 15000)
  
  it('debería obtener preguntas de la API real', async () => {
    const result = questionsData
    
    console.log("Respuesta recibida:", {
        type: typeof result,
        isArray: Array.isArray(result),
        length: result?.length || "N/A",
        firstItem: result?.[0] || "No hay items"
    })

    // Verificaciones básicas
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    
    // Verificar estructura de la primera pregunta
    const firstQuestion = result[0]
    expect(firstQuestion).toHaveProperty('id_question')
    expect(firstQuestion).toHaveProperty('question')
    expect(firstQuestion).toHaveProperty('correct_answer')
    expect(firstQuestion).toHaveProperty('answers')
    
    // Verificar tipos de datos
    expect(typeof firstQuestion.id_question).toBe('number')
    expect(typeof firstQuestion.question).toBe('string')
    expect(typeof firstQuestion.correct_answer).toBe('number')
    expect(typeof firstQuestion.answers).toBe('string')
    
    // Verificar que la pregunta no esté vacía
    expect(firstQuestion.question.length).toBeGreaterThan(0)
    
    console.log('✅ Test completado exitosamente!')
    
  }, 15000) // timeout de 15 segundos para llamadas reales

  it('debería tener el formato correcto de respuestas', async () => {
    const result = questionsData
    
    if (result.length > 0) {
      const question = result[0]
      
      // Las respuestas deberían estar separadas por **
      expect(question.answers).toContain('**')
      
      // Dividir las respuestas
      const answersArray = question.answers.split('**')
      expect(answersArray.length).toBeGreaterThanOrEqual(2)
      
      // La respuesta correcta debería estar dentro del rango
      expect(question.correct_answer).toBeGreaterThanOrEqual(0)
      expect(question.correct_answer).toBeLessThan(answersArray.length)
      
      console.log('📝 Ejemplo de pregunta:', {
        question: question.question,
        answers: answersArray,
        correct: question.correct_answer
      })
    }
  }, 15000)

  it('debería tener al menos 10 preguntas', async () => {
    const result = questionsData
    
    expect(result.length).toBeGreaterThanOrEqual(10)
    console.log(`📊 Total de preguntas en la base de datos: ${result.length}`)
    
  }, 15000)

})
