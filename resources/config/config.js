var config = {
    BOARD_WIDTH : 700,
    BOARD_HEIGHT : 700,
    FIGURE_SIZE : 70,
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
                    col : 0,
                    points: 20
                },
                king : {
                    row: 9,
                    col: 1,
                    points: 9999
                },
                queen : {
                    row: 9,
                    col: 2,
                    points: 180
                },
                bishop : {
                    row: 9,
                    col: 3,
                    points: 120
                },
                knight : {
                    row: 9,
                    col: 4,
                    points: 50
                },
                rook : {
                    row: 9,
                    col: 0,
                    points: 80
                }

            }
        },
        {
            figures : {
                color : 'black',
                pawn : {
                    row : 1,
                    col : 0,
                    points: 20
                },
                king : {
                    row: 0,
                    col: 1,
                    points: 9999
                },
                queen : {
                    row: 0,
                    col: 2,
                    points: 180
                },
                bishop : {
                    row: 0,
                    col: 3,
                    points: 120
                },
                knight : {
                    row: 0,
                    col: 4,
                    points: 50
                },
                rook : {
                    row: 0,
                    col: 0,
                    points: 80
                }
            }
        }
    ]
};