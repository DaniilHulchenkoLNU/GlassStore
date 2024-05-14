from abc import abstractmethod, ABC

import numpy as np
from flask import Flask, Response, redirect, url_for
import cv2
# from last import detect_faces, apply_mask

app = Flask(__name__)

import requests
from PIL import Image
import io
from rembg import remove
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Инициализация глобальной переменной streaming
streaming = True


class MaskLoader(ABC):
    @abstractmethod
    def load_mask(self, url): pass

    def toggle_streaming(self, output_image):
        # Конвертация изображения PIL в массив байтов
        with io.BytesIO() as output_bytes:
            output_image.save(output_bytes, format='PNG')
            bytes_data = output_bytes.getvalue()

        # Чтение изображения из массива байтов с помощью OpenCV
        mask = cv2.imdecode(np.frombuffer(bytes_data, np.uint8), cv2.IMREAD_UNCHANGED)

        return mask
class MaskLoaderFromLocal(MaskLoader):
    def load_mask(self, url):
        """
        Загрузка изображения маски и установка прозрачности.
        """
        # Открытие изображения с помощью PIL
        input_image = Image.open(url)

        # Удаление фона
        output_image = remove(input_image)
        return self.toggle_streaming(output_image)
class MaskLoaderFromUrl(MaskLoader):
    def load_mask(self, url):
        """
        Загрузка изображения маски из URL.
        """
        response = requests.get(url, verify=False)
        input_image = Image.open(io.BytesIO(response.content))
        output_image = remove(input_image)

        return self.toggle_streaming(output_image)

def detect_faces(frame, face_cascade):
    """
    Обнаружение лиц на кадре.
    """
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    return faces

def apply_mask(frame, mask, faces):
    """
    Наложение маски на обнаруженные лица.
    """
    for (x, y, w, h) in faces:
        # Определение новых координат для маски
        x1, x2 = x, x + w
        y1, y2 = y, y + h

        # Изменение размера маски с сохранением соотношения сторон
        mask_aspect_ratio = mask.shape[1] / mask.shape[0]
        face_aspect_ratio = w / h

        if mask_aspect_ratio > face_aspect_ratio:
            new_w = int(w * 1.48)  # увеличиваем на 30%
            new_h = int(new_w / mask_aspect_ratio)
        else:
            new_h = int(h * 1.48)  # увеличиваем на 30%
            new_w = int(new_h * mask_aspect_ratio)

        resized_mask = cv2.resize(mask, (new_w, new_h))

        # Центрирование маски относительно лица
        x_offset = (w - new_w) // 2
        y_offset = (h - new_h) // 2 - 10
        x1 += x_offset
        y1 += y_offset
        x2 = x1 + new_w
        y2 = y1 + new_h

        # Наложение маски на кадр
        for c in range(0, 3):
            frame[y1:y2, x1:x2, c] = (frame[y1:y2, x1:x2, c] * (1 - resized_mask[:, :, 3] / 255.0)
                                       + resized_mask[:, :, c] * (resized_mask[:, :, 3] / 255.0))
    return frame
def gen_frames(path, mask_loader: MaskLoader):
    # mask_path = "Glasses/1/2.png"
    mask = mask_loader.load_mask(path)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    camera = cv2.VideoCapture(0)

    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            faces = detect_faces(frame, face_cascade)
            frame_with_mask = apply_mask(frame, mask, faces)
            ret, buffer = cv2.imencode('.jpg', frame_with_mask)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/')
def index():
    return redirect(url_for('video_feed', id='None'))


@app.route('/<id>')
def video_feed(id):
    # print(id)
    if id == "None":
        mask_loader = MaskLoaderFromLocal()
        path = "2.png"
    else:
        mask_loader = MaskLoaderFromUrl()
        path = f"https://localhost:7042/help/getimagebyid/{id}/1"
    print(f"Received id: {id}")
    return Response(gen_frames(path, mask_loader), mimetype='multipart/x-mixed-replace; boundary=frame')



@app.route('/stop_stream')
def stop_stream():
    print("Stream stopped")
    return "Stream stopped"

if __name__ == '__main__':
    # while True:
        try:
            app.run(host='0.0.0.0', port=5000, debug=True)
        except Exception as e:
            print(f"An error occurred: {e}. Restarting the application...")
        except GeneratorExit:
            print("User disconnected")
# https://localhost:7042/help/getimagebyid/653927fb47981feeebf70d97/1

# import numpy as np
# from flask import Flask, Response
# import cv2
# from last import detect_faces, apply_mask
#
# app = Flask(__name__)
#
# import requests
# from PIL import Image
# import io
# from rembg import remove
# import urllib3
# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
#
# def load_mask(url):
#     """
#     Загрузка изображения маски из URL.
#     """
#     response = requests.get(url, verify=False)
#     input_image = Image.open(io.BytesIO(response.content))
#     output_image = remove(input_image)
#
#     # Конвертация изображения PIL в массив байтов
#     with io.BytesIO() as output_bytes:
#         output_image.save(output_bytes, format='PNG')
#         bytes_data = output_bytes.getvalue()
#
#     # Чтение изображения из массива байтов с помощью OpenCV
#     mask = cv2.imdecode(np.frombuffer(bytes_data, np.uint8), cv2.IMREAD_UNCHANGED)
#
#     return mask
#
# def gen_frames(id):
#     # mask_path = "Glasses/1/2.png"
#     mask_path = f"https://localhost:7042/help/getimagebyid/{id}/1"
#     mask = load_mask(mask_path)
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
#     camera = cv2.VideoCapture(0)
#
#     while True:
#         success, frame = camera.read()
#         if not success:
#             break
#         else:
#             faces = detect_faces(frame, face_cascade)
#             frame_with_mask = apply_mask(frame, mask, faces)
#             ret, buffer = cv2.imencode('.jpg', frame_with_mask)
#             frame = buffer.tobytes()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
#
# @app.route('/<id>')
# def video_feed(id):
#     # Теперь вы можете использовать id внутри этой функции
#     print(f"Received id: {id}")
#     return Response(gen_frames(id), mimetype='multipart/x-mixed-replace; boundary=frame')
#
#
# if __name__ == '__main__':
#     try:
#         app.run(host='0.0.0.0', port=5000, debug=True)
#     except Exception as e:
#         print(f"An error occurred: {e}. Restarting the application...")
#     except GeneratorExit:
#         print("User disconnected")
#         app.run(host='0.0.0.0', port=5000, debug=True)



# from flask import Flask, Response
# import cv2
# from last import detect_faces, apply_mask, load_mask
#
# app = Flask(__name__)
#
# def gen_frames():
#     mask_path = "Glasses/1/2.png"
#     mask = load_mask(mask_path)
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
#     camera = cv2.VideoCapture(0)
#
#     while True:
#         success, frame = camera.read()
#         if not success:
#             break
#         else:
#             faces = detect_faces(frame, face_cascade)
#             frame_with_mask = apply_mask(frame, mask, faces)
#             ret, buffer = cv2.imencode('.jpg', frame_with_mask)
#             frame = buffer.tobytes()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
#
# @app.route('/video_feed')
# def video_feed():
#     return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
#
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port='5000', debug=True)