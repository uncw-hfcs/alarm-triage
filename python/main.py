import TrialGen

seed = "4ffbbe96-8664-11eb-8dcd-0242ac130003"

def handleInt(inp_str="Enter number of trials to export: "):
    try:
        n = int(input(inp_str))
        if n <= 0:
            raise ValueError()
        return n
    except ValueError:
        print("Please enter an integer > 0")
        return handleInt(inp_str)


def handleFileName(inp_str="Enter a file name to export: "):
    inp = input(inp_str)
    if not inp:
        print("File name cannot be blank.")
        return handleFileName(inp_str)
    if inp[-4::] == ".csv":
        return inp
    else:
        return inp + ".csv"


def handleSeed(inp_str="Enter a seed string or press enter for a new seed: "):
    inp = input(inp_str)
    if not inp:
        print("Seed cannot be blank.")
        return handleSeed(inp_str)

    return inp


if __name__ == '__main__':
    num_trials = handleInt()
    file_name = handleFileName()
    tg = TrialGen.Builder(num_trials, file_name, seed)

    tg.toCSV()
