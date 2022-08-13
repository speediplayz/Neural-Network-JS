class NeuralNetwork{
    constructor(layers){
        this.layers = layers;
        this.biases = [];
        this.neurons = [];
        this.weights = [];

        this.initNetwork();
        this.randomizeNetwork();
    }

    initNetwork(){
        let biasList = [];
        let neuronList = [];
        for(let i = 0; i < this.layers.length; i++){
            let b = new Array(this.layers[i]);
            let n = new Array(this.layers[i]);
            biasList.push(b);
            neuronList.push(n);
        }
        this.biases = biasList;
        this.neurons = neuronList;

        let weightList = [];
        for(let i = 0; i < this.layers.length - 1; i++){
            let neuron = [];
            for(let j = 0; j < this.layers[i]; j++){
                let w = new Array(this.layers[i+1]);
                neuron.push(w);
            }
            weightList.push(neuron);
        }
        this.weights = weightList;
    }

    randomizeNetwork(){
        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i+1]; j++){
                this.biases[i+1][j] = this.#random();
            }
        }

        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i]; j++){
                for(let k = 0; k < this.layers[i+1]; k++){
                    this.weights[i][j][k] = this.#random();
                }
            }
        }
    }

    feedForward(input){
        for(let i = 0; i < this.layers[0]; i++){
            this.neurons[0][i] = input[i];
        }

        for(let i = 1; i < this.layers.length; i++){
            for(let j = 0; j < this.layers[i]; j++){
                let val = 0;
                for(let k = 0; k < this.layers[i-1]; k++){
                    val += this.neurons[i-1][k] * this.weights[i-1][k][j];
                }
                this.neurons[i][j] = this.#activation(val + this.biases[i][j]);
            }
        }
        return this.neurons[this.neurons.length - 1];
    }

    printNetwork(){
        console.log(this.layers);
        console.log(" ");
        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i+1]; j++){
                console.log(this.biases[i+1][j]);
            }
        }
        console.log(" ");
        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i]; j++){
                for(let k = 0; k < this.layers[i+1]; k++){
                    console.log(this.weights[i][j][k]);
                }
            }
        }
    }

    crossOver(other){
        let net = new NeuralNetwork(this.layers);

        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i+1]; j++){
                net.biases[i+1][j] = random() < 0.5 ? this.biases[i+1][j] : other.biases[i+1][j];
            }
        }

        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i]; j++){
                for(let k = 0; k < this.layers[i+1]; k++){
                    net.weights[i][j][k] = random() < 0.5 ? this.weights[i][j][k] : other.weights[i][j][k];
                }
            }
        }

        return net;
    }

    mutateNetwork(chance){
        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i+1]; j++){
                this.biases[i+1][j] = this.#getMutation(this.biases[i+1][j], chance);
            }
        }

        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i]; j++){
                for(let k = 0; k < this.layers[i+1]; k++){
                    this.weights[i][j][k] = this.#getMutation(this.weights[i][j][k], chance);
                }
            }
        }
    }

    clone(){
        let net = new NeuralNetwork(this.layers);

        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i+1]; j++){
                net.biases[i+1][j] = this.biases[i+1][j];
                net.neurons[i+1][j] = this.neurons[i+1][j];
            }
        }

        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i]; j++){
                for(let k = 0; k < this.layers[i+1]; k++){
                    net.weights[i][j][k] = this.weights[i][j][k];
                }
            }
        }

        return net;
    }

    compare(other){
        let equal = true;

        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i+1]; j++){
                if(this.biases[i+1][j] != other.biases[i+1][j]) equal = false;
            }
        }

        for(let i = 0; i < this.layers.length - 1; i++){
            for(let j = 0; j < this.layers[i]; j++){
                for(let k = 0; k < this.layers[i+1]; k++){
                    if(this.weights[i][j][k] != other.weights[i][j][k]) equal = false;
                }
            }
        }

        return equal;
    }

    #getMutation(val, chance){
        if(random() < chance){
            let opt = random();
            if(opt <= 0.25){
                return -val;
            } else if(opt <= 0.5){
                return this.#random();
            } else if(opt <= 0.75) {
                return val * 0.9;
            } else {
                return val * val;
            }
        }
        return val;
    }

    #activation(val){
        //return 1 / (1 + exp(-3.5 * val));         // sigmoid
        //return val/(abs(val)+0.5);                // custom
        return 1 / (1 + exp(-3.5 * (val - 0.275))); // sigmoid tweaked
    }

    #random(){
        return (random() - 0.5) * 2;
    }
}

class Creature{
    constructor(layers){
        this.network = new NeuralNetwork(layers);

        this.inputs = [];
        this.outputs = [];
        this.expectedOutputs = [];
        this.currentFitness = 0;

        this.initCreature();
    }

    initCreature(){

    }

    fitnessFunction(){
        let fit = 0;

        for(let i = 0; i < this.outputs.length; i++){
            let choice = this.outputs[i][0] < 0.5 ? 0 : 1;
            if(choice == this.expectedOutputs[i][0]) fit++;
        }

        return fit;
    }

    performAction(input){
        let output = this.network.feedForward(input);

        let expected = [];
        expected[0] = input[0] + input[1] > 0 ? 1 : 0;

        this.inputs.push(input);
        this.outputs.push([...output]);
        this.expectedOutputs.push(expected);
        return output
    }

    mutate(chance){
        let creature = new Creature(this.network.layers);
        creature.network = this.network.clone();
        creature.network.mutateNetwork(chance);
        return creature;
    }

    crossOver(other){
        let network = this.network.crossOver(other);
        return new Creature(network);
    }
}

class GeneticAlgorithm{
    constructor(layers, populationSize){
        this.layers = layers;
        this.populationSize = populationSize;
        this.creatures = new Array(populationSize);
        for(let i = 0; i < populationSize; i++){
            this.creatures[i] = new Creature(layers);
        }
    }

    getBestCreature(){
        let maxFit = -1, maxCreature = -1;
        for(let i = 0; i < this.populationSize; i++){
            let fitness = this.creatures[i].fitnessFunction();
            if(fitness > maxFit){
                maxFit = fitness;
                maxCreature = i;
            }
        }
        return {creature: this.creatures[maxCreature], index: maxCreature, fitness: maxFit};
    }

    performActions(input){
        for(let i = 0; i < this.populationSize; i++){
            this.creatures[i].performAction(input);
        }
    }

    printFitness(){
        for(let i = 0; i < this.populationSize; i++){
            console.log(this.creatures[i].currentFitness);
        }
    }

    generateNewPopulation(chance, autoUpdate){
        let parent = this.getBestCreature().creature;
        let newCreatures = [parent];
        for(let i = 0; i < this.populationSize-1; i++){
            newCreatures.push(parent.mutate(chance));
        }

        for(let i = 0; i < this.populationSize; i++){
            newCreatures[i].inputs = [];
            newCreatures[i].outputs = [];
            newCreatures[i].expectedOutputs = [];
            newCreatures[i].currentFitness = 0;
        }

        if(autoUpdate) this.creatures = newCreatures;

        return newCreatures;
    }
}