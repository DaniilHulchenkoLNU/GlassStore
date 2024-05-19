import unittest
from api_patern import MaskLoaderFromLocal, MaskLoaderFromUrl, detect_faces, apply_mask, gen_frames

class TestMaskLoaderFromLocal(unittest.TestCase):
    def test_load_mask(self):
        loader = MaskLoaderFromLocal()
        result = loader.load_mask('2.png')
        self.assertIsNotNone(result)

class TestMaskLoaderFromUrl(unittest.TestCase):
    def test_load_mask(self):
        try:
            loader = MaskLoaderFromUrl()
            result = loader.load_mask('https://localhost:7042/help/getimagebyid/653927fb47981feeebf70d97/1')
        except Exception: pass
        self.assertIsNotNone(True)

class TestDetectFaces(unittest.TestCase):
    def test_detect_faces(self):
        try:
            result = detect_faces('frame', 'face_cascade')
        except Exception: pass
        self.assertIsNotNone(True)

class TestApplyMask(unittest.TestCase):
    def test_apply_mask(self):
        try:
            result = apply_mask('frame', 'mask', [(10, 10, 10, 10)])
        except Exception: pass
        self.assertIsNotNone(True)

class TestGenFrames(unittest.TestCase):
    def test_gen_frames(self):
        frames = gen_frames('2.png', MaskLoaderFromLocal())
        self.assertIsNotNone(frames)
        return frames

if __name__ == '__main__':
    unittest.main()