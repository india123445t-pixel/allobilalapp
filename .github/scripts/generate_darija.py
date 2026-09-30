from huggingface_hub import hf_hub_download
import outetts
from outetts.models.config import GenerationConfig
import wave
import numpy as np
import subprocess

MODEL_REPO = "KandirResearch/DarijaTTS-v0.1-500M"
MODEL_FILE = "unsloth.Q8_0.gguf"

model_path = hf_hub_download(repo_id=MODEL_REPO, filename=MODEL_FILE)

cfg = outetts.GGUFModelConfig_v2(
    model_path=model_path,
    tokenizer_path="Lyte/DarijaTTS",
    verbose=False,
)

interface = outetts.InterfaceGGUF(model_version="0.3", cfg=cfg)

gen = GenerationConfig(
    text="السلام خويا، كيداير؟ لاباس عليك؟",
    temperature=0.3,
    repetition_penalty=1.1,
    max_length=512,
    speaker=None,
)

audio = interface.generate(config=gen)
samples = audio.audio.detach().cpu().squeeze().float().clamp(-1, 1).numpy()
pcm = (samples * 32767.0).astype(np.int16)

with wave.open("darija.wav", "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(audio.sr)
    wf.writeframes(pcm.tobytes())

print(f"WAV_READY=darija.wav SR={audio.sr} SAMPLES={pcm.size}")

subprocess.run(["git", "config", "user.name", "github-actions[bot]"], check=False)
subprocess.run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], check=False)
subprocess.run(["git", "add", "-f", "darija.wav"], check=False)
subprocess.run(["git", "commit", "-m", "test: publish generated Darija WAV [skip ci]"], check=False)
push = subprocess.run(
    ["git", "push", "origin", "HEAD:temp/darija-tts-cloud-test"],
    check=False,
    capture_output=True,
    text=True,
)
print(f"PUSH_RC={push.returncode}")
print(push.stdout[-2000:])
print(push.stderr[-2000:])
