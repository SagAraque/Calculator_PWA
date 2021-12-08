const app = Vue.createApp({
    data() {
        return {
            title: 'Calculadora Vue',
            operation: '0',
        };
    },
    methods: {
        setCharacter(value) {
            if(this.operation.length!=15){
                this.operation === '0' || this.operation === 'Error' ? this.operation=value : this.operation=this.operation+value;
            }
        },
        restart() {
            this.operation = '0';
        },
        operate(){
            try {
                this.operation=eval(this.operation.replace('x','*')).toFixed(6); 
            } catch (error) {
                this.operation='Error';
            }
            if(this.operation === undefined) this.operation='Error';
        }
    },
});