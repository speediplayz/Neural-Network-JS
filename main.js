let tests = [[0,0],[0,1],[1,0],[1,1]];

let generations = 128;
let populationSize = 8;
let population = new GeneticAlgorithm([2,3,1], populationSize);
let bestNetwork = undefined;

for(let i = 0; i < generations; i++){
	for(let j = 0; j < populationSize; j++){
		//population.creatures[j].network.printNetwork();
	}
	for(let j = 0; j < tests.length; j++){
		population.performActions(tests[j]);
	}

	if(i%10 == 0 || i == generations-1) {
		let best = population.getBestCreature();
		console.log(`${i+1}/${generations} Fitness: ` + best.fitness);
		bestNetwork = best.creature.network;
	}
	population.generateNewPopulation(0.9, true);
}
