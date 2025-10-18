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
import {
  Home,
  Calculator,
  TrendingUp,
  MapPin,
  Bed,
  Bath,
  Car,
  Shirt,
  PawPrint,
} from "lucide-react";

export default function RentPredictionPage() {
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setResult(null);

    try {
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
      if (sqfeet <= 0 || sqfeet > 10000) {
        toast.error("Square feet must be between 1 and 10,000");
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

      console.log("Submitting form:", form);
      const prediction = await predictRent(form);
      console.log("Prediction result:", prediction);

      if (prediction !== null) {
        setResult(prediction);
        toast.success("Rent prediction calculated successfully!");
      } else {
        toast.error("Failed to get prediction. Please try again.");
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const regionOptions = [
    "akron / canton",
    "albany",
    "ames",
    "albuquerque",
    "anchorage / mat-su",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Toaster position="top-center" />

      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Smart Rent Predictor
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get accurate rent predictions powered by machine learning. Simply
              enter your property details and get instant estimates.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Result Display */}
        {result !== null && (
          <div className="mb-2 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <TrendingUp className="h-6 w-6" />
              <h2 className="text-2xl font-semibold">Predicted Monthly Rent</h2>
            </div>
            <div className="text-center">
              <span className="text-5xl font-bold">
                ${result.toLocaleString()}
              </span>
              <p className="text-green-100 mt-2">
                Based on your property specifications
              </p>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl px-8 pt-10">
          {/* <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Property Details
            </h2>
            <p className="text-gray-600">
              Fill in the details below to get your rent prediction
            </p>
          </div> */}

          <form onSubmit={handleSubmit}>
            {/* Row 1: Region, Property Type, Square Feet */}
            <div className="flex gap-4 mb-6 justify-center">
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Region</span>
                </Label>
                <Select onValueChange={(val) => handleChange("region", val)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your region" />
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

              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Property Type</span>
                </Label>
                <Select onValueChange={(val) => handleChange("type", val)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select property type" />
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
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Shirt className="h-4 w-4" />
                  <span>Laundry Options</span>
                </Label>
                <Select
                  onValueChange={(val) => handleChange("laundry_options", val)}
                >
                  <SelectTrigger className="h-12">
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
            </div>

            {/* Row 2: Bedrooms, Bathrooms, Laundry Options */}
            <div className="flex gap-4 mb-6 justify-center">
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Bed className="h-4 w-4" />
                  <span>Bedrooms</span>
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  className="h-12"
                  onChange={(e) => handleChange("beds", e.target.value)}
                />
              </div>

              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Bath className="h-4 w-4" />
                  <span>Bathrooms</span>
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  className="h-12"
                  onChange={(e) => handleChange("baths", e.target.value)}
                />
              </div>
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700">
                  Square Feet
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 1200"
                  className="h-12"
                  onChange={(e) => handleChange("sqfeet", e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Parking Options, Furnished, Cats Allowed, Dogs Allowed */}
            <div className="flex gap-4 justify-center">
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Car className="h-4 w-4" />
                  <span>Parking Options</span>
                </Label>
                <Select
                  onValueChange={(val) => handleChange("parking_options", val)}
                >
                  <SelectTrigger className="h-12">
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
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  Furnished
                </Label>
                <Select
                  onValueChange={(val) => handleChange("comes_furnished", val)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Yes or No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <PawPrint className="h-4 w-4" />
                  <span>Cats Allowed</span>
                </Label>
                <Select
                  onValueChange={(val) => handleChange("cats_allowed", val)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Yes or No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <PawPrint className="h-4 w-4" />
                  <span>Dogs Allowed</span>
                </Label>
                <Select
                  onValueChange={(val) => handleChange("dogs_allowed", val)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Yes or No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>Predict Rent</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>
            Powered by machine learning algorithms trained on real housing data
          </p>
        </div>
      </div>
    </div>
  );
}
