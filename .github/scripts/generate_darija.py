import base64
import torch

# Coqui XTTS checkpoints are trusted model files. PyTorch 2.6+ / 2.14
# defaults to weights_only=True, which blocks XTTS config objects.
_orig_torch_load = torch.load
def _xtts_compatible_load(*args, **kwargs):
    kwargs.setdefault("weights_only", False)
    return _orig_torch_load(*args, **kwargs)
torch.load = _xtts_compatible_load

from TTS.api import TTS

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
