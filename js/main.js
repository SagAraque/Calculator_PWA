const app = Vue.createApp({
    data() {
        return {
            title: 'Calculadora Vue',
            value: '0',
        };
    },
    methods: {
        setCharacter(value) {
            if(this.value.length!=15){
                if((this.value === '0' || this.value === 'Error') && value === '.'){
                    this.value = '0.';
                }else{
                    this.value === '0' || this.value === 'Error' || this.value === 'NaN' || this.value === '0.00' ? this.value=value : this.value=this.value+value;
                }
            }
        },
        restart() {
            this.value = '0';
        },
        operate(){
            try {
                this.value=eval(this.value.replace('x','*')).toFixed(2); 
                this.value = this.value.toString();
            } catch (error) {
                this.displayError();
            }
            if(this.value === undefined || this.value === 'NaN') this.displayError();
        },
        del(){
            if(this.value != '0' && this.value != 'Error' && this.value != 'NaN'){
                this.value.length === 1 ? this.value = '0' : this.value = this.value.substring(0,this.value.length-1);   
            } 
        },
        displayError(){
            this.value='Error';
        },
        sqrt(){
            this.value=(Math.sqrt(this.value).toFixed(2)).toString();
            if(this.value === undefined || this.value === 'NaN') this.displayError();
        },
        pow(){
            this.value=(Math.pow(this.value, 2)).toString();
            if(this.value === undefined || this.value === 'NaN') this.displayError();
        },


    },
});
