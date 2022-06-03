<script>
	import { login } from '../store/user';
	import { clearData } from '../utils';

	let user = {
		email: '',
		password: ''
	};
	let isUpload = false;
	const handlePost = async () => {
		isUpload = true;
		const res = await login(user);
		console.log(res);
		if (res.status === 200) {
			location.reload();
			clearData(user);
		} else {
			error = res.message
		}
		isUpload = false;
	};

	$: error = '';
</script>

<div class="w-full md:w-1/2 flex flex-col">
	{error}
	<h1 class="font-bold text-2xl text-amber-900 my-10">Login</h1>
	<input
		type="text"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Email address"
		bind:value={user.email}
	/>
	<input
		type="password"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Password"
		bind:value={user.password}
	/>
	<a href="/" class="mb-4 rounded-sm  text-amber-900 w-fit font-semibold text-sm "
		>Did You forget your password?</a
	>
	<button
		disabled={isUpload}
		class="disabled:bg-slate-400 mb-4 p-3 rounded-sm bg-amber-900 text-white w-fit font-semibold text-sm"
		on:click={handlePost}
	>
		{#if isUpload}
			<div class="flex items-center">
				<div class="border-dashed animate-spin  w-4 h-4 border-2 rounded-full mr-1" role="status" />
				Loging...
			</div>
		{:else}
			Login
		{/if}
	</button>
	<a href="/" class="mb-4 rounded-sm  text-amber-900 w-fit font-semibold text-sm "
		>Create an Account?</a
	>
	<a href="/" class=" rounded-sm  text-amber-900 w-fit font-semibold text-sm ">Return the store</a>
</div>
