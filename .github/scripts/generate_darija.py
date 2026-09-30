import base64, os, torch
import numpy as np
import soundfile as sf
from transformers import VitsModel, AutoTokenizer
from openvoice import se_extractor
from openvoice.api import ToneColorConverter

TEXT = "آ خويا مصطفى، شنو الأخبار؟ اليوم الجو زوين، وكلشي دايز مزيان. فرحان بزاف حيث دابا الصوت ديالي كيقدر يهضر معاك بالدارجة ديالنا."
BASE_MODEL = "nairaxo/mms-tts-ary-finetuned"
REF = "mustapha_ref.wav"
BASE_WAV = "darija_base.wav"
OUT_WAV = "mustapha_darija_clone.wav"

print("LOADING_DARIJA_MODEL=" + BASE_MODEL)
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)
model = VitsModel.from_pretrained(BASE_MODEL)
model.eval()

inputs = tokenizer(TEXT, return_tensors="pt")
with torch.no_grad():
    wav = model(**inputs).waveform.squeeze().cpu().numpy().astype(np.float32)

sf.write(BASE_WAV, wav, model.config.sampling_rate)
print(f"DARIJA_BASE_READY={BASE_WAV} SR={model.config.sampling_rate} SAMPLES={wav.size}")

device = "cpu"
ckpt = "OpenVoice/checkpoints/converter"
converter = ToneColorConverter(f"{ckpt}/config.json", device=device)
converter.load_ckpt(f"{ckpt}/checkpoint.pth")

source_se, _ = se_extractor.get_se(BASE_WAV, converter, target_dir="processed_source", vad=True)
target_se, _ = se_extractor.get_se(REF, converter, target_dir="processed_target", vad=True)

converter.convert(
    audio_src_path=BASE_WAV,
    src_se=source_se,
    tgt_se=target_se,
    output_path=OUT_WAV,
    message="@MustaphaDarija"
)
print("VOICE_CLONE_READY=" + OUT_WAV)

for label, path in [("BASE", BASE_WAV), ("CLONE", OUT_WAV)]:
    data = base64.b64encode(open(path,"rb").read()).decode("ascii")
    chunks=[data[i:i+30000] for i in range(0,len(data),30000)]
    print(f"{label}_B64_COUNT={len(chunks)}")
    for i,ch in enumerate(chunks):
        print(f"{label}_B64_{i:03d}={ch}")
