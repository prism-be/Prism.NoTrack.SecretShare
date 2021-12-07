<script lang="ts">
	import { Row, Col, Container, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText, Card, CardBody } from 'sveltestrap';
</script>

<Container class="border border-top-0 rounded-bottom">
	<Row>
		<Col>
			<h1 class="pt-3 pb-2">The NoTrack project</h1>
			The No-Track project is a set of tools that can be used :
			<ul>
				<li>For free</li>
				<li>Without any ads</li>
				<li>Without any tracking</li>
			</ul>
			The only limitation is a rate limit to avoid spam.<br />
			I hope you will use it with respect of the work being done.

			<h2 class="pt-3 pb-2">What is the <u>Secret Share</u> ?</h2>
			It's a simple tool that encrypt a secret with a pass phrase and a secret key.
			<ul>
				<li>You can only decrypt the secret here, because the secret key is on the server.</li>
				<li>We cannot decrypt the secret without you, because we don't know your passphrase.</li>
			</ul>

			<h2 class="pt-3 pb-2">What is tracked ?</h2>
			Short answer is nothing. The long answer is, of course there are some technical logs on the servers, but without any user informations.<br />
			Also, the number of use of each link is stored in database.<br />
			Nothing else :)<br />
			If you want to be sure of that, you can check by yourself on
			<a href="https://github.com/prism-be/Prism.NoTrack.SecretShare">this repository</a>.

			<h2 class="pt-3 pb-2">Free to use, but not to run</h2>
			Of course, these tools are not free to run. I make these because I really like the

			<p>If you want to support this project, you are welcome to :</p>
			<ul>
				<li>
					<a href="https://buy.stripe.com/fZe29I2zJ1co9peaEE">Buy me a coffee (2.5€)</a>
				</li>
				<li>
					<a href="https://buy.stripe.com/fZebKi7U38EQ9peeUV">Buy me a beer (5.0€)</a>
				</li>
				<li>
					<a href="https://buy.stripe.com/14k7u23DNcV69pe28a">Buy me a rhum (10.0€)</a>
				</li>
			</ul>
			<p />

			<h2 class="pt-3 pb-2">Another way to support ?</h2>
			Yes, of course ! This is an open source project, you can fork it and add the feature you want. This is stored in GitHub :
			<a href="https://github.com/prism-be/Prism.NoTrack.SecretShare">Prism.NoTrack.Shortener</a>.

			<h2 class="pt-3 pb-2">Bugs ? Support ?</h2>
			This project is made on personal time, with the use of beta version of
			<a href="https://kit.svelte.dev/">SvelteKit</a>. there can be bugs, I can take time to fix them. <br />
			So, you use this tool as is, without any guarantee. You can always open an issue in the GitHub below.
		</Col>
	</Row>
</Container>
