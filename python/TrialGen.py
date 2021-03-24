"""
Generates main task trials for the alarm-triage app
"""
import random
import json
from os.path import join
from csv import writer


class Builder:
    """
    Main task trial object builder
    """
    def __init__(self, num_trials, file_name, seed):
        self.seed = seed
        self.num_trials = num_trials
        self.file_name = file_name

        random.seed(seed)

    def toCSV(self, path="out/"):
        with open(join(path, self.file_name), "w+", newline='') as f:
            csv = writer(f, dialect="excel")
            csv.writerow(["SET_ID", "MATCH_IDS", "GRID_IDS"])
            for i in range(self.num_trials):
                csv.writerow(self._buildTrial())
                f.flush()

    def toJSON(self, path="out/"):
        trial_json = {
            "seed": self.seed,
            "trialCount": self.num_trials,
            "trials": self._buildJson()
        }

        with open(join(path, self.file_name), "w+") as f:
            json.dump(trial_json, f, indent=4)

    def _buildTrial(self):
        set = random.randint(1, 3)
        sample = random.sample(range(1, 26), 6)
        correct = sample[0:2]
        grid = correct * 6
        grid += sample[2:7] * 2
        grid += [0] * 8
        random.shuffle(grid)

        return set, correct, grid

    def _buildJson(self):
        symbol_path = "../assets/img/symbols/"
        set_path = ""
        n = 1
        trial_data = list()
        tile_data = list()
        for i in range(self.num_trials):
            set, correct, grid = self._buildTrial()
            set_path = f'{symbol_path}{set}/'
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

            trial_data.append({
                "id": n,
                "matchData": match_data,
                "tileData": tile_data
            })

            tile_data = list()
            n += 1

        return trial_data
