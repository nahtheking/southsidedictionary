import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const searchWord = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}/words/search?query=${keyword}`);
    // Kiểm tra nếu không có kết quả
    if (!response.data || response.data.length === 0) {
      throw new Error('Không tìm thấy từ');
    }
    
    // Lấy kết quả đầu tiên và format lại theo cấu trúc mà frontend cần
    const wordData = response.data[0];
    
    // Log để kiểm tra dữ liệu
    console.log('API Response:', wordData);
    
    // Format dữ liệu theo đúng cấu trúc mà Results component cần
    return {
      word: wordData.word,
      phonetics: wordData.phonetics || [],
      meanings: wordData.meanings.map(m => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.map(d => ({
          definition: d.definition || '',
          example: d.example || '',
          synonyms: d.synonyms || [],
          antonyms: d.antonyms || []
        }))
      }))
    };
  } catch (error) {
    console.error('Error searching word:', error);
    throw error;
  }
};

export const getAllWords = async () => {
  try {
    const response = await axios.get(`${API_URL}/words`);
    return response.data;
  } catch (error) {
    console.error('Error getting all words:', error);
    throw error;
  }
};

export const getWordById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/words/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting word details:', error);
    throw error;
  }
};

export const createWord = async (wordData) => {
  try {
    const response = await axios.post(`${API_URL}/words`, wordData);
    return response.data;
  } catch (error) {
    console.error('Error creating word:', error);
    throw error;
  }
};

export const updateWord = async (id, wordData) => {
  try {
    const response = await axios.put(`${API_URL}/words/${id}`, wordData);
    return response.data;
  } catch (error) {
    console.error('Error updating word:', error);
    throw error;
  }
};

export const deleteWord = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/words/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting word:', error);
    throw error;
  }
}; 