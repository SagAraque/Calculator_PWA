const app = Vue.createApp({
    data() {
        return {
            title: 'Calculadora Vue',
            value: '0',
            history: [],
        };
    },
    methods: {
        setCharacter(value) {
            if(this.value.length!=15){
                if((this.value === '0' || this.value === 'Error') && value === '.'){
                    this.value = '0.';
                }else{
                    this.value === '0' || this.value === 'Infinity' || this.value === 'Error' || this.value === 'NaN' || this.value === '0.00' ? this.value=value : this.value=this.value+value;
                }
            }
        },
        restart() {
            this.value = '0';
        },
        operate(){
            try {
                let result = eval(this.value.replace('x','*')).toFixed(2)
                this.setHistory(this.value);
                if(result.length>18) result = (parseFloat(result).toExponential(3)).toString();
                this.value === undefined || this.value === 'NaN' ? this.displayError() : this.value=(result).toString();
            } catch (error) {
                this.displayError();
            }
        },
        del(){
            if(this.value != '0' && this.value != 'Error' && this.value != 'NaN' && this.value != 'Infinity'){
                this.value.length === 1 ? this.value = '0' : this.value = this.value.substring(0,this.value.length-1);   
            } 
        },
        displayError(){
            this.value = 'Error';
        },
        sqrt(){
            let result = Math.sqrt(eval(this.value.replace('x','*'))).toFixed(2);
            this.setHistory(result, `√${this.value}`);
            this.value === undefined || this.value === 'NaN' ? this.displayError() : this.value=result.toString();;
            if(this.value.length>18) this.value = (parseFloat(this.value).toExponential(3)).toString();
        },
        pow(){
            let result = Math.pow(eval(this.value.replace('x','*')), 2).toFixed(2);
            this.setHistory(result, `${this.value}^2`);
            result === undefined || result === 'NaN' ? this.displayError() : this.value = result.toString();
            if(this.value.length>18) this.value = (parseFloat(this.value).toExponential(3)).toString();
            
        },
        setHistory(operation, simbol){
            if(this.history.length === 8) this.history.splice(7,1);
            if(simbol === undefined){
                this.history.unshift(`${operation} = ${eval(operation.replace('x','*')).toFixed(2)}`);
            }else{
                this.history.unshift(`${simbol} = ${operation}`);
            }
            
        },
        getHistory(index){
            this.value = (this.history[index].toString()).substring(this.history[index].indexOf('=')+2,this.history[index].length);
        },
        cleanHistory(){
            this.history = [];
        }

    },
});
