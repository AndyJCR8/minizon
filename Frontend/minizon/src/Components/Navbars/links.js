export const interiorsLinks = [
  { path: null, icon: "chair", content: "item1", links: [
    { path: "/", content: "subItem1" },
    { path: "/", content: "subItem2" },
    { path: "/", content: "subItem3" },
    { path: "/", content: "subItem4" },
    { path: "/", content: "subItem5" },
    { path: "/", content: "subItem6" },
    { path: "/", content: "subItem7" },
  ] },
  { path: null, icon: "spoon", content: "item2", links: [
    { path: "/", content: "subItem8" },
    { path: "/", content: "subItem9" },
    { path: "/", content: "subItem10" },
    { path: "/", content: "subItem11" },
  ] },
  { path: "/", content: "item3" },
  { path: "/", content: "item4" },
  { path: "/", content: "item5" },
  { path: "/", content: "item6" },
  { path: "/", content: "item7" },
  { path: "/", content: "item8" },
]

export const exteriorLinks = interiorsLinks.map((x, i) => { return { path: x.path, content: "item" + (i + interiorsLinks.length + 1) } });