const Word = require('../models/Word');

// Lấy tất cả các từ
exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tìm từ theo từ khóa
exports.searchWord = async (req, res) => {
  try {
    const { query } = req.query;
    const words = await Word.find({
      word: { $regex: query, $options: 'i' }
    });

    // Format dữ liệu trước khi trả về
    const formattedWords = words.map(word => ({
      word: word.word,
      phonetics: word.phonetics.map(p => ({
        text: p.text,
        audio: p.audio
      })),
      meanings: word.meanings.map(m => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.map(d => ({
          definition: d.definition,
          example: d.example,
          synonyms: d.synonyms || [],
          antonyms: d.antonyms || []
        }))
      }))
    }));

    res.json(formattedWords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết một từ
exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      // Format dữ liệu trước khi trả về
      const formattedWord = {
        word: word.word,
        phonetics: word.phonetics.map(p => ({
          text: p.text,
          audio: p.audio
        })),
        meanings: word.meanings.map(m => ({
          partOfSpeech: m.partOfSpeech,
          definitions: m.definitions.map(d => ({
            definition: d.definition,
            example: d.example,
            synonyms: d.synonyms || [],
            antonyms: d.antonyms || []
          }))
        }))
      };
      res.json(formattedWord);
    } else {
      res.status(404).json({ message: 'Không tìm thấy từ này' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm từ mới
exports.createWord = async (req, res) => {
  try {
    const { word, phonetics, meanings } = req.body;
    
    // Tạo từ mới với cấu trúc đúng
    const newWord = new Word({
      word,
      phonetics: phonetics.map(p => ({
        text: p.text,
        audio: p.audio
      })),
      meanings: meanings.map(m => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.map(d => ({
          definition: d.definition,
          example: d.example,
          synonyms: d.synonyms || [],
          antonyms: d.antonyms || []
        }))
      }))
    });

    const savedWord = await newWord.save();
    
    // Format dữ liệu trước khi trả về
    const formattedWord = {
      word: savedWord.word,
      phonetics: savedWord.phonetics.map(p => ({
        text: p.text,
        audio: p.audio
      })),
      meanings: savedWord.meanings.map(m => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.map(d => ({
          definition: d.definition,
          example: d.example,
          synonyms: d.synonyms || [],
          antonyms: d.antonyms || []
        }))
      }))
    };
    
    res.status(201).json(formattedWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật từ
exports.updateWord = async (req, res) => {
  try {
    const { word, phonetics, meanings } = req.body;
    const existingWord = await Word.findById(req.params.id);
    
    if (existingWord) {
      existingWord.word = word;
      existingWord.phonetics = phonetics.map(p => ({
        text: p.text,
        audio: p.audio
      }));
      existingWord.meanings = meanings.map(m => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.map(d => ({
          definition: d.definition,
          example: d.example,
          synonyms: d.synonyms || [],
          antonyms: d.antonyms || []
        }))
      }));

      const updatedWord = await existingWord.save();
      
      // Format dữ liệu trước khi trả về
      const formattedWord = {
        word: updatedWord.word,
        phonetics: updatedWord.phonetics.map(p => ({
          text: p.text,
          audio: p.audio
        })),
        meanings: updatedWord.meanings.map(m => ({
          partOfSpeech: m.partOfSpeech,
          definitions: m.definitions.map(d => ({
            definition: d.definition,
            example: d.example,
            synonyms: d.synonyms || [],
            antonyms: d.antonyms || []
          }))
        }))
      };
      
      res.json(formattedWord);
    } else {
      res.status(404).json({ message: 'Không tìm thấy từ này' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa từ
exports.deleteWord = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      await word.deleteOne();
      res.json({ message: 'Đã xóa từ thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy từ này' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 