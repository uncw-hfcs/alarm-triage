import os
import json
import random

default_seed = "4ffbbe96-8664-11eb-8dcd-0242ac130003"
default_num_trials = 256
user_id = ""
trials_fname = "trials.json"
events_fname = "events.json"


def createWorkingDir(dir_name):
    os.chdir('../assets/data')
    os.mkdir(dir_name)
    os.chdir(dir_name)

    return os.getcwd()


def generateTrials(seed, num_trials=256):
    symbol_path = "../assets/img/symbols/"
    n = 1
    trials = list()
    tile_data = list()
    random.seed(seed)

    def _buildTrial():
        _t_set = random.randint(1, 3)
        sample = random.sample(range(1, 26), 6)
        _correct = sample[0:2]
        _grid = _correct * 6
        _grid += sample[2:7] * 2
        _grid += [0] * 8
        random.shuffle(_grid)

        return _t_set, _correct, _grid

    for i in range(num_trials):
        t_set, correct, grid = _buildTrial()
        set_path = f'{symbol_path}{t_set}/'
        match_data = {
            1: {
                "id": correct[0],
                "path": f'{set_path}{correct[0]}.png'
            },
            2: {
                "id": correct[1],
                "path": f'{set_path}{correct[1]}.png'
            }
        }

        for t in grid:
            tile_data.append({
                "id": t,
                "path": f'{set_path}{t}.png' if t > 0 else ''
            })

        trials.append({
            "id": n,
            "matchData": match_data,
            "tileData": tile_data
        })

        tile_data = list()
        n += 1

    return {
        "seed": seed,
        "count": len(trials),
        "trials": trials
    }


def generateAlarms(src_path, seed, num_alarms=0):
    with open(src_path, "r") as f:
        if num_alarms > 0:
            data = [row.strip().split(',') for row in f.readlines()[1:num_alarms+1]]
        else:
            data = [row.strip().split(',') for row in f.readlines()[1:]]

    alarms = list()
    for i in data:
        alarms.append({
            "id": int(i[0]),
            "valid": i[1] == "TRUE",
            "data": {
                1: {
                    "authCity": i[2],
                    "logins": {
                        "success": int(i[3]),
                        "failed": int(i[4][:-1]) + 1 if i[4][-1] == '+' else int(i[4])
                    },
                    "provider": i[5]
                },
                2: {
                    "authCity": i[6],
                    "logins": {
                        "success": int(i[7]),
                        "failed": int(i[4][:-1]) + 1 if i[4][-1] == '+' else int(i[4])
                    },
                    "provider": i[9]
                }
            },
            "authTime": float(i[10]),
            "vpnConfidence": float(i[11][:-1]),
            "scenario": i[12],
            "confidence": i[13]
        })

    random.seed(seed)
    random.shuffle(alarms)

    return {
        "seed": seed,
        "count": len(alarms),
        "alarms": alarms
    }


def toJsonFile(json_data, file_name, dst_path):
    with open(os.path.join(dst_path, file_name), "w") as f:
        json.dump(json_data, f, indent=4)


if __name__ == '__main__':
    this_dir = os.path.dirname(os.path.realpath(__file__))
    path = createWorkingDir('demo')
    events_src = os.path.join(this_dir, "in/events.csv")
    _seed = "ff9783dc-a2a5-11eb-bcbc-0242ac130002"

    toJsonFile(generateTrials(_seed, 5), "trials.json", path)
    toJsonFile(generateAlarms(events_src, _seed, 3), "alarms.json", path)

