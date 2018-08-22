webpackJsonp([21837251667693],{359:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Back to React! Let\'s make our app be able to read live data about animals to adopt! This data is courteous of <a href="https://www.petfinder.com/">Petfinder.com</a>, a wonderful service that provides a free API for adopting animals. Unfortunately, this service is USA-based, so please use USA locations only or else it won\'t return any results.</p>\n<p>Please register <a href="https://www.petfinder.com/developers/api-key">here</a> for an API key from Petfinder. Create a file in the root of your project (same directory as package.json) that is called <code class="language-text">.env</code>. Put this in there:</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">API_KEY=&lt;Your API key&gt;\nAPI_SECRET=&lt;Your API secret&gt;</code></pre>\n      </div>\n<p>Now Parcel will read these variables out of your .env file and make them available inside of your app. Now you don\'t have to commit secrets to your codebase and that\'s <em>always</em> a good thing. If someone gets access to GitHub for your code, they won\'t necessarily get your API keys. You\'ll use a different service like <a href="https://azure.microsoft.com/en-us/services/key-vault/?WT.mc_id=react-github-brholt">Azure Key Vault</a> or <a href="https://kubernetes.io/docs/concepts/configuration/secret/">Kubernetes Secrets</a> to manage your secrets.</p>\n<p>Now that your secrets are in there, let\'s install the Petfinder Client. I wrote this little wrapper for the API; it\'s not good. It\'s optimized for this use case only. Run <code class="language-text">npm install petfinder-client</code>. In App.js, add:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// at the top</span>\n<span class="token keyword">import</span> pf <span class="token keyword">from</span> <span class="token string">"petfinder-client"</span><span class="token punctuation">;</span>\n\n<span class="token comment">// under imports</span>\n<span class="token keyword">const</span> petfinder <span class="token operator">=</span> <span class="token function">pf</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  key<span class="token punctuation">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">API_KEY</span><span class="token punctuation">,</span>\n  secret<span class="token punctuation">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">API_SECRET</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// inside class, above render</span>\n<span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  petfinder<span class="token punctuation">.</span>breed<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">{</span> animal<span class="token punctuation">:</span> <span class="token string">"dog"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>log<span class="token punctuation">,</span> console<span class="token punctuation">.</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<ul>\n<li>pf takes in credentials and returns an API object. You only have to give it credentials here; anywere else you import it it\'ll retain the same credentials. The API response has a silly and ridiculous structure.</li>\n<li><code class="language-text">componentDidMount</code> is a life cycle method for React; there are several of them but <code class="language-text">componentDidMount</code> is by far the most useful. This is where you will make AJAX requests, integrate with third-party libraries; anything that you want guarantee that the DOM exists as well as anything you want to guarantee happens after the first render.</li>\n<li>Here we\'re just making it request and logging it out. Let\'s make it store it as state.</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// inside class, at top</span>\n<span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>\n    pets<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// replace cDM</span>\n<span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  petfinder<span class="token punctuation">.</span>pet\n    <span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span> location<span class="token punctuation">:</span> <span class="token string">"Seattle, WA"</span><span class="token punctuation">,</span> output<span class="token punctuation">:</span> <span class="token string">"full"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> pets<span class="token punctuation">;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>petfinder<span class="token punctuation">.</span>pets <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>petfinder<span class="token punctuation">.</span>pets<span class="token punctuation">.</span>pet<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>petfinder<span class="token punctuation">.</span>pets<span class="token punctuation">.</span>pet<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          pets <span class="token operator">=</span> data<span class="token punctuation">.</span>petfinder<span class="token punctuation">.</span>pets<span class="token punctuation">.</span>pet<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n          pets <span class="token operator">=</span> <span class="token punctuation">[</span>data<span class="token punctuation">.</span>petfinder<span class="token punctuation">.</span>pets<span class="token punctuation">.</span>pet<span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        pets <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n      <span class="token punctuation">}</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        pets\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// inside render, under h1</span>\n<span class="token operator">&lt;</span>pre<span class="token operator">></span>\n  <span class="token operator">&lt;</span>code<span class="token operator">></span><span class="token punctuation">{</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>code<span class="token operator">></span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>pre<span class="token operator">></span></code></pre>\n      </div>\n<ul>\n<li>\n<p>Whenever a class gets created (React or not), the constructor gets called. If you don\'t create a constructor, there\'s a default one that silently gets run in the background. Inside we accept the props from whatever parent created it and then call <code class="language-text">super(props)</code> since we need to take those props and hand them to React.</p>\n</li>\n<li>\n<p>We initiate state here. We are going to be keeping an array of pet data that we load from the API. We\'ll initialize that as an empty array so we never have to check if that array exists or not.</p>\n</li>\n<li>\n<p>We\'re calling petfinder\'s find method. This lets us search for animals. This method requires a <em>location</em> and an <em>output</em>. The location can be any American "<City>, <Two Letter State Abbreviation>" combination. I\'ll be using "Seattle, WA" but feel free to use "New York City, NY", "San Francisco, CA", or any other city that suits you. Output should always be full for our use case.</p>\n</li>\n<li>\n<p>Now, after the response comes back from the API, we call a method called <code class="language-text">setState</code>. setStates takes in an object and does a shallow merge with your current state. In our case, we want to throw away the empty array and replace it with the <code class="language-text">pet</code> array that we got back from the API.</p>\n</li>\n<li>\n<p>We have to do a bit of work to make sure our app doesn\'t barf on bad data. If there is only one pet returned, it doesn\'t get returned as an array, it gets returned as an object so we need to catch that and wrap it.</p>\n</li>\n<li>\n<p>Now we take that API data and output that to the DOM. Notice React is smart enough to re-render itself after a setState is called. <code class="language-text">pre</code> and <code class="language-text">code</code> are two tags that allow you to output that code pre-formatted.</p>\n</li>\n</ul>\n<p>Let\' make the app use the <code class="language-text">Pet</code> component we made.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// replace render</span>\n<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>div<span class="token operator">></span>\n      <span class="token operator">&lt;</span>h1<span class="token operator">></span>Adopt Me<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>\n      <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>pets<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>pet <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">let</span> breed<span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>pet<span class="token punctuation">.</span>breeds<span class="token punctuation">.</span>breed<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          breed <span class="token operator">=</span> pet<span class="token punctuation">.</span>breeds<span class="token punctuation">.</span>breed<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">", "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n          breed <span class="token operator">=</span> pet<span class="token punctuation">.</span>breeds<span class="token punctuation">.</span>breed<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>\n          <span class="token operator">&lt;</span>Pet\n            animal<span class="token operator">=</span><span class="token punctuation">{</span>pet<span class="token punctuation">.</span>animal<span class="token punctuation">}</span>\n            key<span class="token operator">=</span><span class="token punctuation">{</span>pet<span class="token punctuation">.</span>id<span class="token punctuation">}</span>\n            name<span class="token operator">=</span><span class="token punctuation">{</span>pet<span class="token punctuation">.</span>name<span class="token punctuation">}</span>\n            breed<span class="token operator">=</span><span class="token punctuation">{</span>breed<span class="token punctuation">}</span>\n          <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<ul>\n<li>\n<p>We use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map">map</a> which takes a JavaScript array, takes a function, applies that function to <em>each</em> array item (i.e. if you have an array of length 15, that function gets called 15 times,) and returns a new array containing the results of each of those function called. In <code class="language-text">const x = [1,2,3].map(num =&gt; { return num * 2});</code>, <code class="language-text">x</code> is <code class="language-text">[2,4,6]</code>. In this case, we have an array of Pet data objects and we transform those into Pet components.</p>\n</li>\n<li>\n<p>Breed comes back as a string if it\'s a single breed. They come back as an array if there are multiple breeds, just like above. We need to make sure we catch that.</p>\n</li>\n<li>\n<p>Key is a unique identifier that we give React so it can do quick comparisons on objects. If we decide to change how we sort the list of pets, e.g. we sort by shelter instead of breed, we\'d re-arrange all the object but they\'d be the same object. All React knows is it got a new list. Without any further hinting, React would just destroy all the DOM objects and start over. If we give it a unique key for each object, it can track that an object just moved positions and didn\'t actually get destroyed and just move the DOM object instead of re-rendering. Big performance win.</p>\n</li>\n</ul>\n<p>Let\'s go make Pet look nicer</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Pet</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> animal<span class="token punctuation">,</span> breed<span class="token punctuation">,</span> media<span class="token punctuation">,</span> location <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n    <span class="token keyword">let</span> photos <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>media <span class="token operator">&amp;&amp;</span> media<span class="token punctuation">.</span>photos <span class="token operator">&amp;&amp;</span> media<span class="token punctuation">.</span>photos<span class="token punctuation">.</span>photo<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      photos <span class="token operator">=</span> media<span class="token punctuation">.</span>photos<span class="token punctuation">.</span>photo<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>photo <span class="token operator">=></span> photo<span class="token punctuation">[</span><span class="token string">"@size"</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"pn"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"pet"</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"image-container"</span><span class="token operator">></span>\n          <span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token punctuation">{</span>photos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value<span class="token punctuation">}</span> alt<span class="token operator">=</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n        <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"info"</span><span class="token operator">></span>\n          <span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>\n          <span class="token operator">&lt;</span>h2<span class="token operator">></span><span class="token punctuation">{</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>animal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> — </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>breed<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> — </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>location<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">></span>\n        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> Pet<span class="token punctuation">;</span></code></pre>\n      </div>\n<p>And in App.js</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// add to what you pass to Pet</span>\nmedia<span class="token operator">=</span><span class="token punctuation">{</span>pet<span class="token punctuation">.</span>media<span class="token punctuation">}</span>\nlocation<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>pet<span class="token punctuation">.</span>contact<span class="token punctuation">.</span>city<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>pet<span class="token punctuation">.</span>contact<span class="token punctuation">.</span>state<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">}</span></code></pre>\n      </div>\n<ul>\n<li>Petfinder gives you five sizes of each image. The <code class="language-text">pn</code> size is the appropriate size for what we want.</li>\n</ul>\n<h2 id="-07b1b51715cfce4adc61fe8ff9fe995dee801a9b"><a href="#-07b1b51715cfce4adc61fe8ff9fe995dee801a9b" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>🌳 07b1b51715cfce4adc61fe8ff9fe995dee801a9b</h2>',frontmatter:{path:"/react-state-and-lifecycles",title:"State and Lifecycle Methods with React",order:6}},allMarkdownRemark:{edges:[{node:{frontmatter:{order:1,path:"/intro",title:"Introduction"}}},{node:{frontmatter:{order:2,path:"/pure-react",title:"Pure React"}}},{node:{frontmatter:{order:3,path:"/eslint-prettier",title:"npm, ESLint & Prettier"}}},{node:{frontmatter:{order:4,path:"/parcel",title:"Parcel"}}},{node:{frontmatter:{order:5,path:"/jsx",title:"JSX"}}},{node:{frontmatter:{order:6,path:"/react-state-and-lifecycles",title:"State and Lifecycle Methods with React"}}},{node:{frontmatter:{order:7,path:"/reach-router",title:"Reach Router"}}},{node:{frontmatter:{order:8,path:"/async-and-events-in-react",title:"Handling Events and Async UIs with React"}}},{node:{frontmatter:{order:9,path:"/forms",title:"Forms with React"}}},{node:{frontmatter:{order:10,path:"/context",title:"Context"}}},{node:{frontmatter:{order:11,path:"/portals",title:"Portals"}}},{node:{frontmatter:{order:12,path:"/conclusion",title:"Conclusion"}}},{node:{frontmatter:{order:13,path:"/testing",title:"Testing"}}},{node:{frontmatter:{order:14,path:"/emotion",title:"Emotion"}}},{node:{frontmatter:{order:15,path:"/code-splitting",title:"Code Splitting"}}},{node:{frontmatter:{order:16,path:"/redux",title:"Redux"}}},{node:{frontmatter:{order:17,path:"/server-side-rendering",title:"Server Side Rendering"}}},{node:{frontmatter:{order:18,path:"/preact",title:"Preact"}}},{node:{frontmatter:{order:19,path:"code-organization",title:"Code Organization"}}}]}},pathContext:{}}}});
//# sourceMappingURL=path---react-state-and-lifecycles-03c93b2eebcd87f155c7.js.map