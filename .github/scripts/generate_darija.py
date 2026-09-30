import base64, wave
import numpy as np
import torch
import outetts
from outetts.models.config import GenerationConfig

MODEL_REPO = "KandirResearch/DarijaTTS-v0.1-500M"

model_config = outetts.HFModelConfig_v2(
    model_path=MODEL_REPO,
    tokenizer_path=MODEL_REPO,
    device="cpu",
    dtype=torch.float32,
    max_seq_length=4096,
)
interface = outetts.InterfaceHF(model_version="0.3", cfg=model_config)

gen_cfg = GenerationConfig(
    text="السلام خويا مصطفى، لاباس عليك؟ كلشي مزيان؟ وصحة، لاباس.",
    temperature=0.3,
    repetition_penalty=1.1,
    max_length=4096,
)
output = interface.generate(config=gen_cfg)

samples = output.audio.detach().cpu().squeeze().float().clamp(-1,1).numpy()
pcm = (samples * 32767.0).astype(np.int16)
with wave.open("darija.wav","wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(output.sr)
    wf.writeframes(pcm.tobytes())

print(f"HF_WAV_READY=darija.wav SR={output.sr} SAMPLES={pcm.size}")
data=base64.b64encode(open("darija.wav","rb").read()).decode("ascii")
chunks=[data[i:i+30000] for i in range(0,len(data),30000)]
print(f"AUDIO_B64_COUNT={len(chunks)}")
for i,ch in enumerate(chunks):
    print(f"AUDIO_B64_{i:02d}={ch}")
