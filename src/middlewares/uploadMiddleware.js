const multer = require("multer");
const supabase = require("../connection/db");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = (fieldName) => (req, res, next) => {
  upload.single(fieldName)(req, res, async (err) => {
    if (err) {
      return res.send(500, {
        error: true,
        message: "Erro no upload do vídeo",
      });
    }

    if (!req.file) {
      return res.send(400, {
        error: true,
        message: "Nenhum arquivo enviado",
      });
    }

    try {
      const { data, error } = await supabase.storage
        .from("valWiki")
        .upload(`${Date.now()}--${req.file.originalname}`, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) {
        return res.send(500, {
          error: true,
          message: "Erro no upload do vídeo para o Supabase Storage",
        });
      }

      req.uploadedFile = data;

      const baseUrl =
        "https://gqnzfpvcfsvoxflptsjr.supabase.co/storage/v1/object/public";
      req.fileUrl = `${baseUrl}/${data.fullPath}`;

      next();
    } catch (error) {
      return res.send(500, {
        error: true,
        message: "Erro no upload do vídeo para o Supabase Storage",
      });
    }
  });
};

module.exports = uploadMiddleware;
