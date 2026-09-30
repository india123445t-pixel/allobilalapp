import base64
import math
import numpy as np
import soundfile as sf
import torch
from scipy.signal import resample_poly

# Current PyTorch defaults to weights_only=True; Coqui XTTS uses trusted
# config objects in its official checkpoint.
_orig_torch_load = torch.load
def _xtts_compatible_load(*args, **kwargs):
    kwargs.setdefault("weights_only", False)
    return _orig_torch_load(*args, **kwargs)
torch.load = _xtts_compatible_load

from TTS.api import TTS
import TTS.tts.models.xtts as xtts_module

# Avoid TorchCodec dependency when XTTS reads the speaker reference.
def _load_audio_soundfile(audiopath, sampling_rate):
    audio, sr = sf.read(audiopath, dtype="float32", always_2d=True)
    audio = audio.mean(axis=1)
    if sr != sampling_rate:
        g = math.gcd(int(sr), int(sampling_rate))
        audio = resample_poly(audio, int(sampling_rate)//g, int(sr)//g)
    audio = np.asarray(audio, dtype=np.float32)
    return torch.from_numpy(audio).unsqueeze(0)

xtts_module.load_audio = _load_audio_soundfile

TEXT = "آ خويا، اليوم الجو زوين، وأنا فرحان حيث أخيرًا الصوت ديالي ولى كيهضر معاك بالدارجة بشكل طبيعي."

tts = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2", progress_bar=False, gpu=False)
tts.tts_to_file(
    text=TEXT,
    speaker_wav="mustapha_ref.wav",
    language="ar",
    file_path="mustapha_clone_test.wav",
)

data = base64.b64encode(open("mustapha_clone_test.wav","rb").read()).decode("ascii")
chunks=[data[i:i+30000] for i in range(0,len(data),30000)]
print(f"CLONE_B64_COUNT={len(chunks)}")
for i,ch in enumerate(chunks):
    print(f"CLONE_B64_{i:03d}={ch}")
print("VOICE_CLONE_READY=mustapha_clone_test.wav")
