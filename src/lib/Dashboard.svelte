<script>
	import CardPageVisits from './cards/CardPageVisits.svelte';
	import CardSocialTraffic from './cards/CardSocialTraffic.svelte';
</script>

<div>
	<!-- <div class="flex flex-wrap">
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <CardLineChart />
    </div>
    <div class="w-full xl:w-4/12 px-4">
      <CardBarChart />
    </div>
  </div> -->
	<div class="flex flex-wrap">
		<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
			<CardPageVisits />
		</div>
		<div class="w-full xl:w-4/12 px-4">
			<CardSocialTraffic />
		</div>
	</div>
</div>
