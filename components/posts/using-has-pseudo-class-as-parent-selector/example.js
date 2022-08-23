export const HasPseudoClassExample = () => (
  <div className="HasPseudoClassExample">
    <small className="has-not-supported">
      This demo requires a browser that supports <code>:has()</code>.
    </small>

    <div>
      <img src="/static/images/ocean.jpeg" />
      <p>Image description.</p>
    </div>
    <div>
      <img src="/static/images/html.jpg" />
    </div>
  </div>
);
