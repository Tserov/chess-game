var config = {
    BOARD_WIDTH : 800,
    BOARD_HEIGHT : 800,
    FIGURE_SIZE : 80,
    BOARD_COORDINATE_DIMENSION:{
        start_col: 0,
        end_col : 9,
        start_row : 0,
        end_row : 9
    },

    FIGURES_LOCATION : [
        {
            figures : {
                color : 'white',
                pawn : {
                    row : 8,
                    col : 0
                },
                king : {
                    row: 9,
                    col: 1,
                },
                queen : {
                    row: 9,
                    col: 2,
                },
                bishop : {
                    row: 9,
                    col: 3,
                },
                knight : {
                    row: 9,
                    col: 4,
                },
                rook : {
                    row: 9,
                    col: 0,
                }

            }
        },
        {
            figures : {
                color : 'black',
                pawn : {
                    row : 1,
                    col : 0
                },
                king : {
                    row: 0,
                    col: 1,
                },
                queen : {
                    row: 0,
                    col: 2,
                },
                bishop : {
                    row: 0,
                    col: 3,
                },
                knight : {
                    row: 0,
                    col: 4,
                },
                rook : {
                    row: 0,
                    col: 0,
                }
            }
        }
    ]
};