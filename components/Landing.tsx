"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { predictRent } from "@/route/predict";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";

export default function RentPredictionPage() {
  const [result, setResult] = useState(0);
  const [form, setForm] = useState({
    region: "",
    type: "",
    sqfeet: "",
    beds: "",
    baths: "",
    comes_furnished: "",
    laundry_options: "",
    parking_options: "",
    cats_allowed: "",
    dogs_allowed: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty fields
    if (
      form.region === "" ||
      form.type === "" ||
      form.sqfeet === "" ||
      form.beds === "" ||
      form.baths === "" ||
      form.comes_furnished === "" ||
      form.laundry_options === "" ||
      form.parking_options === "" ||
      form.cats_allowed === "" ||
      form.dogs_allowed === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    // Validate square feet
    const sqfeet = parseFloat(form.sqfeet);
    if (sqfeet <= 0) {
      toast.error("Square feet must be positive");
      return;
    }

    // Validate beds and baths
    const beds = parseInt(form.beds);
    const baths = parseInt(form.baths);

    if (beds < 0 || beds > 10) {
      toast.error("Beds must be between 0 and 10");
      return;
    }

    if (baths <= 0 || baths > 10) {
      toast.error("Baths must be between 1 and 10");
      return;
    }

    // toast.success("");
    console.log(form);
    const result = await predictRent(form);
    console.log(result);
    setResult(result);
    // You'll POST this data to your backend for prediction
  };
  const regionOptions = [
    "akron / canton",
    "albany",
    "ames",
    "albuquerque",
    ,
    "ann arbor",
    "annapolis",
    "ashtabula",
    "asheville",
    "athens",
    "atlanta",
    "augusta",
    "bakersfield",
    "baltimore",
    "baton rouge",
    "battle creek",
    "bemidji",
    "bend",
    "binghamton",
    "billings",
    "birmingham",
    "bismarck",
    "bloomington",
    "bloomington-normal",
    "boise",
    "boone",
    "boston",
    "boulder",
    "bowling green",
    "brainerd",
    "brunswick",
    "buffalo",
    "butte",
    "cape cod / islands",
    "catskills",
    "cedar rapids",
    "central louisiana",
    "central michigan",
    "central NJ",
    "champaign urbana",
    "charlotte",
    "chautauqua",
    "chicago",
    "chico",
    "chillicothe",
    "cincinnati",
    "clovis / portales",
    "cleveland",
    "columbia / jeff city",
    "columbus",
    "corvallis/albany",
    "cumberland valley",
    "dayton / springfield",
    "daytona beach",
    "decatur",
    "delaware",
    "denver",
    "des moines",
    "detroit metro",
    "dothan",
    "dubuque",
    "duluth / superior",
    "east idaho",
    "east oregon",
    "eastern CO",
    "eastern CT",
    "eastern kentucky",
    "eastern montana",
    "eastern NC",
    "eastern shore",
    "elko",
    "elmira-corning",
    "evansville",
    "fairbanks",
    "fargo / moorhead",
    "farmington",
    "fayetteville",
    "finger lakes",
    "flagstaff / sedona",
    "flint",
    "florence / muscle shoals",
    "florida keys",
    "fort collins / north CO",
    "fort dodge",
    "fort smith",
    "fort wayne",
    "frederick",
    "fresno / madera",
    "ft myers / SW florida",
    "gadsden-anniston",
    "gainesville",
    "glens falls",
    "gold country",
    "grand forks",
    "grand island",
    "grand rapids",
    "great falls",
    "greensboro",
    "gulfport / biloxi",
    "hanford-corcoran",
    "hattiesburg",
    "hartford",
    "hawaii",
    "heartland florida",
    "helena",
    "hickory / lenoir",
    "high rockies",
    "holland",
    "houma",
    "hudson valley",
    "humboldt county",
    "huntington-ashland",
    "huntsville / decatur",
    "imperial county",
    "indianapolis",
    "inland empire",
    "iowa city",
    "ithaca",
    "jackson",
    "jacksonville",
    "joplin",
    "kalamazoo",
    "kalispell",
    "kansas city",
    "kansas city, MO",
    "kenai peninsula",
    "kirksville",
    "kokomo",
    "lafayette",
    "lafayette / west lafayette",
    "lake charles",
    "lake of the ozarks",
    "lakeland",
    "la salle co",
    "las cruces",
    "las vegas",
    "lawrence",
    "lawton",
    "lansing",
    "lewiston / clarkston",
    "lexington",
    "lima / findlay",
    "lincoln",
    "little rock",
    "long island",
    "los angeles",
    "louisville",
    "macon / warner robins",
    "maine",
    "manhattan",
    "mankato",
    "mansfield",
    "mason city",
    "mattoon-charleston",
    "medford-ashland",
    "merced",
    "meridian",
    "mendocino county",
    "mesa",
    "minneapolis / st paul",
    "missoula",
    "mobile",
    "mohave county",
    "monroe",
    "monterey bay",
    "montgomery",
    "muncie / anderson",
    "muskegon",
    "naples",
    "new hampshire",
    "new haven",
    "new orleans",
    "new york city",
    "north central FL",
    "north dakota",
    "north jersey",
    "north mississippi",
    "north platte",
    "northwest CT",
    "northwest GA",
    "northwest KS",
    "northern michigan",
    "northern panhandle",
    "ocala",
    "okaloosa / walton",
    "oklahoma city",
    "omaha / council bluffs",
    "oneonta",
    "orange county",
    "orlando",
    "outer banks",
    "owensboro",
    "panama city",
    "parkersburg-marietta",
    "palm springs",
    "peoria",
    "pensacola",
    "phoenix",
    "plattsburgh-adirondacks",
    "port huron",
    "portland",
    "potsdam-canton-massena",
    "prescott",
    "pullman / moscow",
    "pueblo",
    "quad cities, IA/IL",
    "raleigh / durham / CH",
    "redding",
    "reno / tahoe",
    "richmond",
    "rochester",
    "rockford",
    "roswell / carlsbad",
    "sacramento",
    "salina",
    "santa barbara",
    "santa fe / taos",
    "santa maria",
    "sarasota-bradenton",
    "savannah / hinesville",
    "saginaw-midland-baycity",
    "scottsbluff / panhandle",
    "seattle",
    "sf bay area",
    "shreveport",
    "show low",
    "sioux city",
    "siskiyou county",
    "south bend / michiana",
    "south coast",
    "south florida",
    "south jersey",
    "southwest KS",
    "southwest MN",
    "southwest MS",
    "southwest michigan",
    "space coast",
    "spokane / coeur d'alene",
    "springfield",
    "st augustine",
    "st cloud",
    "st joseph",
    "st louis",
    "st louis, MO",
    "statesboro",
    "stillwater",
    "stockton",
    "southeast alaska",
    "southeast IA",
    "southeast KS",
    "southeast missouri",
    "susanville",
    "syracuse",
    "tallahassee",
    "tampa bay area",
    "terre haute",
    "texarkana",
    "texoma",
    "the thumb",
    "toledo",
    "topeka",
    "treasure coast",
    "tucson",
    "tulsa",
    "tuscaloosa",
    "tuscarawas co",
    "twin falls",
    "twin tiers NY/PA",
    "valdosta",
    "ventura county",
    "visalia-tulare",
    "waco",
    "washington, DC",
    "waterloo / cedar falls",
    "watertown",
    "western IL",
    "western KY",
    "western maryland",
    "western massachusetts",
    "western slope",
    "wichita",
    "wilmington",
    "winchester",
    "winston-salem",
    "worcester / central MA",
    "yuba-sutter",
    "yuma",
    "zanesville / cambridge",
  ];

  const types = [
    "apartment",
    "house",
    "townhouse",
    "condo",
    "manufactured",
    "duplex",
    "flat",
    "cottage/cabin",
    "in-law",
    "loft",
    "land",
  ];
  const laundry = [
    "laundry on site",
    "w/d hookups",
    "laundry in bldg",
    "w/d in unit",
    "no laundry on site",
  ];
  const parking = [
    "street parking",
    "off-street parking",
    "carport",
    "attached garage",
    "detached garage",
    "no parking",
    "valet parking",
  ];

  return (
    <div className="p-16 max-w-2xl mx-auto space-y-6">
      <Toaster position="bottom-center" />
      <div>
        <h1 className="text-3xl font-bold">Your Predicted Rent : ${result}</h1>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="grid gap-3">
            <Label>Region</Label>
            <Select onValueChange={(val) => handleChange("region", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {regionOptions.map((r, index) => (
                  <SelectItem key={`${r}-${index}`} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label>Type</Label>
            <Select onValueChange={(val) => handleChange("type", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t, index) => (
                  <SelectItem key={`${t}-${index}`} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label>Square Feet</Label>
            <Input
              type="number"
              placeholder="Sqft"
              onChange={(e) => handleChange("sqfeet", e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Beds</Label>
              <Input
                type="number"
                onChange={(e) => handleChange("beds", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Baths</Label>
              <Input
                type="number"
                onChange={(e) => handleChange("baths", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="grid gap-3">
            <Label>Laundry Option</Label>
            <Select
              onValueChange={(val) => handleChange("laundry_options", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select laundry option" />
              </SelectTrigger>
              <SelectContent>
                {laundry.map((l, index) => (
                  <SelectItem key={`${l}-${index}`} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label>Parking Option</Label>
            <Select
              onValueChange={(val) => handleChange("parking_options", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select parking option" />
              </SelectTrigger>
              <SelectContent>
                {parking.map((p, index) => (
                  <SelectItem key={`${p}-${index}`} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="grid gap-3">
            <Label>Comes Furnished?</Label>
            <Select
              onValueChange={(val) => handleChange("comes_furnished", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Yes or No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Cats Allowed?</Label>
            <Select onValueChange={(val) => handleChange("cats_allowed", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Yes or No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Dogs Allowed?</Label>
            <Select onValueChange={(val) => handleChange("dogs_allowed", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Yes or No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="cursor-pointer hover:">
          Predict Rent
        </Button>
      </form>
    </div>
  );
}
