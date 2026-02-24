const fs = require('fs');
const path = require('path');

const projects = [
    {
        name: "Prevention of Tuberculosis for marginal people of Makwanpur district.",
        district: "Makwanpur",
        period: "2010-2011",
        donorRaw: "Stop TB Partnership/WHO",
        donorId: null
    },
    {
        name: "Improving Livelihood and sustainable development of pro poor and marginal people through eco friendly vegetable farming (Livelihood-3 projects)",
        district: "Makwanpur, Chitwan",
        period: "2011-2014",
        donorRaw: "GIZ-STPP",
        donorId: "giz"
    },
    {
        name: "Management of wild Honey bee colonies for Biodiversity Conservation, improving Crop Yield and hive Products in inner terai of Nepal (Bio-diversity and livelihood)",
        district: "Bara",
        period: "2011-2012",
        donorRaw: "UNDP-GEF-SGP",
        donorId: "undp"
    },
    {
        name: "Efficient Land management for Socio Economic Enhancement in Southern Nepal (Livelihood and DRR-2 Project)",
        district: "Chitwan, Makwanpur, Bara, Parsa",
        period: "2012-2017",
        donorRaw: "OPEC-OFID",
        donorId: "ofid"
    },
    {
        name: "Strengthening Model Farm of Agricultural income generation activities for enhancing livelihood of the disadvantaged rural people (Livelihood-7 project)",
        district: "Illam, Morang, Sunsari, Nawalparasi, Kapilvastu, Dang, Banke, Bardia, Surkhet and Kailali",
        period: "2012-2014",
        donorRaw: "GIZ-STPP",
        donorId: "giz"
    },
    {
        name: "Improving Livelihood of Marginalized people through socio ecological production landscape (Land management & livelihood)",
        district: "Makwanpur",
        period: "2013-2014",
        donorRaw: "UNDP-GEF-SGP",
        donorId: "undp"
    },
    {
        name: "Promotion of Hood Stove for reducing indoor pollution and fuel wood (Health and Energy)",
        district: "Makwanpur",
        period: "2015-2018",
        donorRaw: "GIZ/Ensev/Practical Action",
        donorId: "giz"
    },
    {
        name: "Mitigation of environmental impact caused by shifting cultivation and livelihood enhancement of rural community (Agro-forestry, environment conservation and livelihood)",
        district: "Tanahu, Kaski",
        period: "2014-2015",
        donorRaw: "USAID-WWF-CARE-FECCOFUN, NTNC, Hariyo Ban Program",
        donorId: null
    },
    {
        name: "Immediate Relief support to Earth Quake Victim (Disaster relief support)",
        district: "Makwanpur, Tanahu",
        period: "2015-2017",
        donorRaw: "Self Funded",
        donorId: null
    },
    {
        name: "Improve Livelihoods of Earthquake Victims for Building Back Better (B3) in Makwanpur District of Nepal",
        district: "Makwanpur",
        period: "2015",
        donorRaw: "Stromme Foundation",
        donorId: null
    },
    {
        name: "Enhance Livelihoods of marginal and Earthquake Victims for building back better (B3) in Makwanpur District of Nepal",
        district: "Makwanpur",
        period: "2016-2017",
        donorRaw: "TEAR FUND Nepal",
        donorId: null
    },
];

const outDir = path.join(__dirname, 'src/content/projects');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

projects.forEach((p, idx) => {
    const slug = 'project-' + (idx + 1);

    // Parse period (e.g. "2010-2011", "2015")
    const parts = p.period.split("-");
    const startYear = parts[0] ? parts[0].trim() : "2000";
    const endYear = parts[1] ? parts[1].trim() : "";

    let frontmatter = '---\n';
    frontmatter += 'title: "' + p.name.replace(/"/g, "'") + '"\n';
    frontmatter += 'description: "Project carried out in ' + p.district + '."\n';
    frontmatter += 'startDate: "' + startYear + '-01-01"\n';

    if (endYear && endYear.toLowerCase() !== "present") {
        frontmatter += 'endDate: "' + endYear + '-12-31"\n';
        frontmatter += 'status: "completed"\n';
    } else {
        frontmatter += 'status: "ongoing"\n';
    }

    if (p.donorId) {
        frontmatter += 'donor: "' + p.donorId + '"\n';
    }

    frontmatter += 'location: "' + p.district + '"\n';
    frontmatter += '---\n\n';

    frontmatter += p.name + ' was successfully executed during the period ' + p.period + '. ';
    if (p.donorRaw) {
        frontmatter += 'Funded by ' + p.donorRaw + '.\n';
    } else {
        frontmatter += '\n';
    }

    fs.writeFileSync(path.join(outDir, slug + '.md'), frontmatter, 'utf-8');
});
console.log('Migration complete.');
