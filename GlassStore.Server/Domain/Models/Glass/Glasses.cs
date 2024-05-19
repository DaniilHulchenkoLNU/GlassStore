using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace GlassStore.Server.Domain.Models.Glass
{
    public class Glasses : DbBase
    {
        // Existing properties...
        [BsonElement("price")]
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public decimal Price { get; set; } // Цена

        [BsonElement("brand")]
        [BsonIgnoreIfNull]
        public string Brand { get; set; } // Бренд

        [BsonElement("model")]
        [BsonIgnoreIfNull]
        public string Model { get; set; } // Модель

        [BsonElement("frame_color")]
        [BsonIgnoreIfNull]
        public string FrameColor { get; set; } // Цвет оправы

        [BsonElement("lens_color")]
        [BsonIgnoreIfNull]
        public string LensColor { get; set; } // Цвет линз

        [BsonElement("frame_material")]
        [BsonIgnoreIfNull]
        public string FrameMaterial { get; set; } // Материал оправы

        [BsonElement("lens_material")]
        [BsonIgnoreIfNull]
        public string LensMaterial { get; set; } // Материал линз

        [BsonElement("is_prescription")]
        [BsonIgnoreIfNull]
        public bool? IsPrescription { get; set; } // Наличие рецепта

        [BsonElement("prescription_type")]
        [BsonIgnoreIfNull]
        public string PrescriptionType { get; set; } // Тип рецепта

        [BsonElement("frame_width")]
        [BsonIgnoreIfNull]
        public double? FrameWidth { get; set; } // Ширина оправы

        [BsonElement("bridge_width")]
        [BsonIgnoreIfNull]
        public double? BridgeWidth { get; set; } // Ширина мостика

        [BsonElement("temple_length")]
        [BsonIgnoreIfNull]
        public double? TempleLength { get; set; } // Длина заушника

        [BsonElement("gender")]
        [BsonIgnoreIfNull]
        public string Gender { get; set; } // Пол

        [BsonElement("shape")]
        [BsonIgnoreIfNull]
        public string Shape { get; set; } // Форма

        [BsonElement("style")]
        [BsonIgnoreIfNull]
        public List<string> Style { get; set; } // Стиль

        [BsonElement("photos")]
        [BsonIgnoreIfNull]
        public List<string> Photos { get; set; } // Фото
    }
}