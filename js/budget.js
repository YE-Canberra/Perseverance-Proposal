const budget = {
  "Manufacture" : {
    "Perseverance" : {
      "Core Parts" : [
	{"name": "3D-Printed Parts", "price": 20000},
	{"name": "Electronics", "price": 500},			//TBD
	{"name": "Miscellaneous Hardware", "price": 1500}
      ],
      "Add-ons" : [
	{"name": "SuperCam (Red LED Light)", "price": 50},
	{"name": "SuperCam (Red Laser Pointer)", "price": 100},
	{"name": "MOXIE (Smoke Machine)", "price": 300},
	{"name": "Arm (Stationary)", "price": 500},
	{"name": "Arm (Remote Controlled)", "price": 800},
      ]
    },
    "Ingenuity" : {
      "Core Parts" : [
	{"name": "3D-Printed Parts", "price": 1200},
	{"name": "Electronics", "price": 500},
	{"name": "Miscellaneous Hardware", "price": 100}
      ],
      "Add-ons" : [
	{"name": "Ability to Fly (Vertical Only)", "price": 13000},
	{"name": "Ability to Fly (Direction Control)", "price": 20000}
      ]
    }
  },
  "Labour" : [
/*
  Prices are calculated as:
  price = expected_time (hrs) * 40 ($/hr);
*/
    {"name": "Administration", "price": 600},		//15hrs

    {"name": "Order Parts", "price": 600},		//15hrs
    {"name": "Assemble Model", "price": 2400},		//60hrs
    {"name": "Program and Wire Model", "price": 1200},	//30hrs
    {"name": "Lesson Plan Creation", "price": 1200},	//30hrs
    {"name": "Teaching", "price": 1200}			//30hrs
//			total time (hrs): 		155
// 			total labour cost ($):	 	6600
  ],
  "Marketing & PR" : [
    {"name": "Promotion Video (5 min)", "price": 5000}
  ]
};

const displayTotals = () => {
  for (let i=0; i<document.getElementsByClassName().length; i++) {
    const deets = document.getElementsByClassName()[i].deets;
    
  }
};

const createCheckBox = (content, checked) => {
  const frag = new DocumentFragment();
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  checkBox.type = 'checkBox';
  checkBox.checked = checked;
  checkBox.disabled = checked;
  label.textContent = content;
  frag.appendChild(checkBox);
  frag.appendChild(label);
  return frag;
};

const createCostingList = () => {
  const tbody = new DocumentFragment();

  const createTableRow = (content, price, className, checkedBox) => {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');

    row.className = className;

    if (className === "titleRow") {
      cell1.textContent = content;
      cell2.textContent = price;
    } else if (className === "sublistRow") {
      cell1.textContent = content;
      cell2.textContent = price;
    } else if (className === "itemRow"){
      cell1.appendChild(createCheckBox(content, checkedBox));
      cell2.textContent = price;
    }
  
    row.appendChild(cell1);
    row.appendChild(cell2);
    tbody.appendChild(row);
  };

  for (let title in budget) {
    createTableRow(title, '', 'titleRow');
    for (let sublist in budget[title]) {
      createTableRow(sublist, '', 'sublistRow');
      budget[title][sublist].forEach(item => {
	createTableRow(item.name, item.price, 'itemRow', sublist === "Core Parts");
      });
    }
  }

console.log(tbody.innerHTML);
//  document.getElementById('costingTable').appendChild(tbody);
};

const appendCostingFragment = () => {
  document.getElementById('costingTable').appendChild(tbody);
};

createCostingList();
window.addEventListener('DOMContentLoaded', appendCostingFragment, {once: true});