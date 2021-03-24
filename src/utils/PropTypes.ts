type TileProps = {
    id: number;
    path: string;
};

type Trial = {
    id: number;
    matchData: {
        1: TileProps;
        2: TileProps;
    };
    tileData: TileProps[];
};

type Trials = {
    seed: string;
    trialCount: number;
    trials: Trial[];
};

export { TileProps, Trial, Trials };
