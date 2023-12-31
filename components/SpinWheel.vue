<script setup lang="ts">
import {
	Chart,
	ArcElement,
	PieController,
	type PieControllerChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTeamsStore } from "~/store/teams";
import type { ChartData } from "chart.js/dist/types";
import { remap } from "@antfu/utils";

Chart.register(ArcElement, PieController);

const teamsStore = useTeamsStore();

const { RemoveTeam } = teamsStore;

const { teams } = storeToRefs(teamsStore);

const teamAngle = computed(() => 360 / teams.value.teams.length);

const data = computed<ChartData>(() => ({
	labels: teams.value.teams.map((team) => team.name),
	datasets: [
		{
			backgroundColor: teams.value.teams.map((team) => team.colorHex),
			data: teams.value.teams.map(() => 1),
		},
	],
}));

const options: PieControllerChartOptions = {
	responsive: true,
	animation: {
		duration: 0,
	},
	plugins: {
		tooltip: false,
		legend: {
			display: false,
		},
		datalabels: {
			color: "#ffffff",
			formatter: (_, context) =>
				context.chart.data.labels[context.dataIndex],
			font: { size: 24 },
		},
	},
	rotation: -(teamAngle.value / 2),
};

const canvas = ref(null);
let chart: Chart<"pie", 1[], string>;

watch(teams.value, () => {
	chart.data = data.value;
	chart.options.rotation = -(teamAngle.value / 2);
	chart.update();
});

onMounted(() => {
	chart = new Chart(canvas.value, {
		type: "pie",
		data: data.value,
		plugins: [ChartDataLabels],
		options,
	});
});

let isRotated = false;
const startSpin = () => {
	if (chart) {
		const rotationTimes = remap(Math.random(), 0, 1, 7, 10);
		const additionalRotationAngle = Math.random() * teamAngle.value;

		isRotated = true;
		chart.options.rotation += rotationTimes * 360 + additionalRotationAngle;
		chart.options.animation = {
			duration: 5000,
			easing: "easeOutSine",
			onComplete: async (event) => {
				clearAnimation();
				if (isRotated) await checkWinner(chart.options.rotation);
				isRotated = false;
			},
		};
		chart.update();
	}
};

async function checkWinner(rotation: number) {
	const currentAngle = rotation % 360;
	const winnerIndex =
		teams.value.teams.length -
		Math.floor(currentAngle / teamAngle.value) -
		1;

	const winnerId = teams.value.teams[winnerIndex].id;

	await new Promise((resolve, reject) =>
		setTimeout(() => {
			RemoveTeam(winnerId);
			resolve();
		}, 3000),
	);
}

function clearAnimation() {
	chart.options.animation = {
		duration: 0,
		onComplete: () => {},
	};
	chart.update();
}
</script>

<template>
	<div class="relative w-[1000px]">
		<canvas ref="canvas" />
		<button
			@click="startSpin"
			class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white w-32 h-32 rounded-full text text-3xl after:content-[''] after:absolute after:-top-[75px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-b-white after:border-x-transparent after:border-t-0 after:border-x-[20px] after:border-b-[80px]"
		>
			Spin
		</button>
	</div>
</template>

<style scoped></style>
