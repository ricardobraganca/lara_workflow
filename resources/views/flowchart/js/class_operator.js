class operator {

    constructor(stage){
        this.start_flowchart(stage);
    }

    start_flowchart(stage){

        let data = {
            operators: {
            0: {
                top: 20,
                left: 20,
                properties: {
                title: 'Formulario de Entrada',
                inputs: {},
                outputs: {
                    output_1: {
                    label: '>>',
                    },
                }
                }
            },
            1: {
                top: 80,
                left: 300,
                properties: {
                title: 'Finalizado',
                inputs: {
                    input_1: {
                    label: '||',
                    },
                },
                outputs: {}
                }
            },
            }
        };

        this.$flowchart = stage;
        this.$container = this.$flowchart.parent();
        // Apply the plugin on a standard, empty div...
        this.$flowchart.flowchart({
            data: data,
            defaultSelectedLinkColor: '#000055',
            grid: 10,
            multipleLinksOnInput: true,
            multipleLinksOnOutput: true
        });
    }

    get_flowchart(){
        return this.$flowchart;
    }

    get_flowchart_container(){
        return this.$container;
    }

    create_operator(operator_id, title, label_input, label_output){

        var operatorData = {
            top: 30,
            left: 30,
            properties: {
                title: title,
                inputs: {
                    input_1: {
                        label: label_input,
                    }
                },
                outputs: {
                    output_1: {
                        label: label_output,
                    }
                }
            }
        };

        this.$flowchart.flowchart('createOperator', operator_id,operatorData);
    }



}
