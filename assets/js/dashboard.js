const text = '#797979';
const lines = '#1e1e1e'

function graficoLine(_div, _label, _valores, _cor, _backgroundColor, _medida) {
    let myConfig = {
        type: "area",

        backgroundColor: "transparent",

        plotarea: {
            backgroundColor: "transparent"
        },

        plot: {
            aspect: "spline",
            lineWidth: 4,
            marker: {
                visible: false
            }
        },

        scaleX: {
            labels: _label,
            lineColor: "transparent",

            item: {
                fontColor: text,
                fontSize: 12
            },

            guide: {
                visible: true,
                lineColor: lines,
                lineStyle: 'dashed',
            },

            tick: {
                visible: false
            }
        },

        scaleY: {
            lineColor: "transparent",

            item: {
                fontColor: text,
                fontSize: 12
            },

            guide: {
                visible: true,
                lineColor: lines,
                lineStyle: 'dashed',

                hoverState: {
                    lineColor: '#ffffff',
                    backgroundColor: '#ffffff',
                },
            },

            tick: {
                visible: false
            },
        },

        tooltip: {
            visible: false
        },

        crosshairX: {
            lineColor: '#ffffff',
            lineWidth: 1,

            plotLabel: {
                text: `%v ${_medida}`
            },

            scaleLabel: {
                visible: false
            },

            marker: {
                backgroundColor: _cor,
                borderColor: '#ffffff',
                size: 6
            }
        },

        series: [{
            values: _valores,

            text: '',

            tooltip: {
                text: '%v kcal'
            },

            lineColor: _cor,
            lineWidth: 4,

            backgroundColor: _backgroundColor,
            alphaArea: 0.1,

            marker: {
                visible: false
            },

            hoverMarker: {
                visible: true,
                size: 8,
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
            },
        }],
    };

    zingchart.render({
        id: _div,
        data: myConfig,
        height: '100%',
        width: '100%'
    });
}

function graficoBar(_div, _label, _valores, _cor, _medida) {

    let myConfig = {
        type: "bar",

        backgroundColor: "transparent",

        plotarea: {
            backgroundColor: "transparent"
        },

        scaleX: {
            labels: _label,

            item: {
                fontColor: text
            },

            guide: {
                visible: true,
                lineColor: lines,
                lineStyle: "dashed"
            },
        },

        plot: {
            overlap: true,
        },

        scaleY: {
            item: {
                fontColor: text
            },

            guide: {
                visible: true,
                lineColor: lines,
                lineStyle: "dashed"
            },
        },

        tooltip: {
            visible: false,
        },
        
        crosshairX: {
            lineWidth: "100%",
            alpha: 0.5,
            backgroundColor: "#ffffff",

            scaleLabel: {
                visible: false,
            },

            plotLabel: {
                text: `%v ${_medida}`
            }
        },

        series: [{
                values: _valores,
                backgroundColor: _cor,
            }],
    };

    zingchart.render({
        id: _div,
        data: myConfig,
        height: '100%',
        width: '100%'
    });
}


window.addEventListener('templatePronto', () => {
    let usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

    document.querySelector('#userName').textContent = usuario.nome


    //cal
    graficoLine('cal', ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'], [400, 200, 400, 200, 100, 50, 400], '#9B30D9', '#9B30D9', 'kcal')

    //Evolucao Peso
    graficoLine('evPeso', ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'], [85, 83.5, 10, 40], '#22c55e', '#1a5830', 'kg')

    //TreinoSemana
    graficoBar('treinoSem', ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], [3, 4, 2, 4], '#9B30D9', 'treinos')
});