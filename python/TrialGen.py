"""
Generates main task trials for the alarm-triage app
"""
import random
from os.path import join
from csv import writer


class Builder:
    """
    Main task trial object builder
    """
    def __init__(self, num_trials, file_name, seed):
        random.seed(seed)
        self.num_trials = num_trials
        self.file_name = file_name

    def toCSV(self, path="out/"):
        with open(join(path, self.file_name), "w+", newline='') as f:
            csv = writer(f, dialect="excel")
            csv.writerow(["SET_ID", "MATCH_IDS", "GRID_IDS"])
            for i in range(self.num_trials):
                csv.writerow(self._buildTrial())
                f.flush()

    def _buildTrial(self):
        set = random.randint(1, 3)
        sample = random.sample(range(1, 26), 6)
        correct = sample[0:2]
        grid = correct * 6
        grid += sample[2:7] * 2
        grid += [0] * 8
        random.shuffle(grid)

        return set, correct, grid
