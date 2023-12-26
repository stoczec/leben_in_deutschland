const wrapper = () => `
max-width: 1920px;
margin-inline: auto;
min-height: 100%;
overflow: hidden;
`;

const container = ({ width_px, width_percent }) => `
width: min(${width_px || '1384px'}, ${width_percent || '90%'});
margin-inline: auto;`;

export const mixins = { wrapper, container };
