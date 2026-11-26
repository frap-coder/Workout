"""Build Android artifacts without putting signing secrets in the repository."""
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('--release', action='store_true')
parser.add_argument('--signing-file', type=Path)
parser.add_argument('--version-code', type=int, default=2)
parser.add_argument('--version-name', default='1.0.1')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
env = os.environ.copy()
if args.version_code < 1:
    parser.error('version-code must be positive')
if args.signing_file:
    file = args.signing_file.resolve()
    data = json.loads(file.read_text())
    store = Path(data['store_file'])
    if not store.is_absolute():
        store = file.parent / store
    if not store.is_file():
        parser.error('Keystore file not found')
    env.update(WORKOUT_KEYSTORE_FILE=str(store), WORKOUT_STORE_PASSWORD=data['store_password'],
               WORKOUT_KEY_ALIAS=data['key_alias'], WORKOUT_KEY_PASSWORD=data['key_password'])
if args.release and not all(env.get(key) for key in ['WORKOUT_KEYSTORE_FILE', 'WORKOUT_STORE_PASSWORD', 'WORKOUT_KEY_ALIAS', 'WORKOUT_KEY_PASSWORD']):
    parser.error('Release needs --signing-file or the four WORKOUT signing environment variables')
env.update(WORKOUT_VERSION_CODE=str(args.version_code), WORKOUT_VERSION_NAME=args.version_name)
subprocess.run(['npm', 'run', 'android:sync'], cwd=root, env=env, check=True)
wrapper = 'gradlew.bat' if os.name == 'nt' else './gradlew'
task = 'bundleRelease' if args.release else 'assembleDebug'
subprocess.run([wrapper, '--no-daemon', task], cwd=root/'android', env=env, check=True)
source = root/'android/app/build/outputs'/('bundle/release/app-release.aab' if args.release else 'apk/debug/app-debug.apk')
out = root/'artifacts'
out.mkdir(exist_ok=True)
destination = out/('daily-reps-'+args.version_name+('-play.aab' if args.release else '-test.apk'))
shutil.copy2(source, destination)
print('Created:', destination)
