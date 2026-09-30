from huggingface_hub import hf_hub_download
import outetts
from outetts.models.config import GenerationConfig
import subprocess, sys, base64

subprocess.run([sys.executable, "-m", "pip", "install", "-q", "torchcodec"], check=True)

MODEL_REPO = "KandirResearch/DarijaTTS-v0.1-500M"
model_path = hf_hub_download(repo_id=MODEL_REPO, filename="unsloth.Q8_0.gguf")

model_config = outetts.GGUFModelConfig_v2(
    model_path=model_path,
    tokenizer_path=MODEL_REPO,
)
interface = outetts.InterfaceGGUF(model_version="0.3", cfg=model_config)

gen_cfg = GenerationConfig(
    text="السلام خويا مصطفى، لاباس عليك؟ كلشي مزيان؟ وصحة، لاباس.",
    temperature=0.3,
    repetition_penalty=1.1,
    max_length=4096,
)
output = interface.generate(config=gen_cfg)
output.save("darija.wav")

data = base64.b64encode(open("darija.wav","rb").read()).decode("ascii")
chunks=[data[i:i+30000] for i in range(0,len(data),30000)]
print(f"AUDIO_B64_COUNT={len(chunks)}")
for i,ch in enumerate(chunks):
    print(f"AUDIO_B64_{i:02d}={ch}")
print("OFFICIAL_SAVE_OK=darija.wav")
