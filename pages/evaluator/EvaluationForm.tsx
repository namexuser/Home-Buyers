import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save, ChevronRight, Mail } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { send } from '@emailjs/browser';
import { auth } from '../../firebase';

const EMAILJS_SERVICE_ID = 'service_jj5dvrs';
const EMAILJS_TEMPLATE_ID = 'template_nj8v0zu';
const EMAILJS_PUBLIC_KEY = 'hQGcm7ZPkADBksHoW';

const conditionOptions = ["Good", "Fair", "Poor", "Needs Repair", "Missing", "N/A"];
const distanceOptions = ["1 KM", "3 KM", "5 KM", "7+ KM", "Missing", "N/A"];
const titleOptions = [
  "Freehold - Full Title Deed",
  "State Land - Fixed Period State Grant",
  "State Land - Registered Lease",
  "Tribal Land - Customary Grant (Certificate of Rights)",
  "Tribal Land - Common Law Lease",
  "Missing",
  "N/A"
];
const exitStrategyOptions = ["Flip", "Hold", "Wholesale", "New Construction", "Add Units", "Other", "Missing", "N/A"];
const tenantOccupiedOptions = ["Yes", "No", "Unknown", "Missing", "N/A"];
const yesNoUnknownOptions = ["Yes", "No", "Unknown", "Missing", "N/A"];
const yesNoOptions = ["Yes", "No", "Missing", "N/A"];
const systemsList = ["HVAC", "Electrical", "Plumbing", "Roof", "Bathroom Sanitary Fixtures", "Water Heater", "Appliances"];

const interiorRooms = [
  'Floor Plan', 'Living Room', 'Bedroom 1', 'Bedroom 2', 'Bedroom 3', 
  'Bathroom 1', 'Bathroom 2', 'Bathroom 3', 'Kitchen', 'Storage', 'Garage', 'Laundry Room'
];

const getFinishesForRoom = (room: string) => {
  let base = ['Ceiling', 'Tiles', 'Flooring', 'Doors (Insulation)', 'Windows (Insulation)', 'Light Fixtures', 'Appliances', 'A/C Unit', 'Water Heater', 'Washer / Dryer', 'General Observable Conditions'];
  
  if (['Floor Plan', 'Living Room'].includes(room)) {
    base = base.filter(f => !['Water Heater', 'Washer / Dryer'].includes(f));
  } else if (['Bedroom 1', 'Bedroom 2', 'Bedroom 3'].includes(room)) {
    base = base.filter(f => !['Water Heater', 'Washer / Dryer'].includes(f));
    base.splice(base.indexOf('General Observable Conditions'), 0, 'Wardrobe');
  } else if (['Bathroom 1', 'Bathroom 2', 'Bathroom 3'].includes(room)) {
    base = base.filter(f => !['Water Heater', 'Washer / Dryer'].includes(f));
    base.splice(base.indexOf('General Observable Conditions'), 0, 'Plumbing', 'Sanitary Fixtures', 'Cabinets');
  } else if (room === 'Kitchen') {
    base = base.map(f => f === 'Washer / Dryer' ? 'Kitchen Cabinets' : f);
  } else if (['Storage', 'Garage'].includes(room)) {
    base = base.filter(f => !['Water Heater', 'Washer / Dryer', 'Appliances', 'A/C Unit'].includes(f));
  }
  return base;
};

const defaultFinishes: any = {};
interiorRooms.forEach(room => {
  const roomKey = room.replace(/\s+/g, '');
  defaultFinishes[roomKey] = {};
  const finishes = getFinishesForRoom(room);
  finishes.forEach(finish => {
    if (finish !== 'General Observable Conditions') {
      defaultFinishes[roomKey][finish.replace(/[^a-zA-Z0-9]/g, '')] = 'Needs Repair';
    } else {
      defaultFinishes[roomKey].generalObservableConditions = '';
    }
  });
});

const EvaluationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [activeTab, setActiveTab] = useState('propertyId');

  const { register, handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      structureConstruction: {
        foundations: 'Needs Repair',
        blocksCement: 'Needs Repair',
        attic: 'Needs Repair',
        driveway: 'Needs Repair',
        constructionMaterialQuality: 'Needs Repair',
        roof: 'Needs Repair',
        systemsEndLifespan: []
      },
      interiorSpacesRepairs: interiorRooms.reduce((acc: any, room) => {
        acc[room.replace(/\s+/g, '')] = 'Needs Repair';
        return acc;
      }, {}),
      finishesFixturesRepairs: defaultFinishes,
      mechanicalSystems: {
        electrical: 'Needs Repair',
        plumbing: 'Needs Repair',
        sewer: 'Needs Repair',
        meteredWater: 'Needs Repair',
        meteredElectricity: 'Needs Repair',
        meteredGas: 'Needs Repair',
        generalObservableConditions: '',
      },
      neighborhoodLocation: {
        landscaping: 'Needs Repair',
        transportation: 'Needs Repair',
        schools: 'Needs Repair',
        servicesNearby: 'Needs Repair',
        generalObservableConditions: '',
        shoppingMall: '3 KM',
        busStop: '3 KM',
        hospital: '3 KM',
        playgrounds: '3 KM',
        pedestrianArea: '3 KM',
      },
      marketInvestmentContext: {
        homeAssociation: 'No'
      },
      propertyManagementAvailability: {
        isOccupiedByTenant: 'No',
        isProfessionalManagementAvailable: 'Unknown'
      }
    }
  });

  // Computed Fields
  const sqmBuilding = parseFloat(watch('propertyId.sqmBuilding')) || 0;
  const sqmLand = parseFloat(watch('propertyId.sqmLand')) || 0;
  
  // Helper to parse formatted numbers
  const parseNumber = (val: any) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') return parseFloat(val.replace(/,/g, '')) || 0;
    return 0;
  };

  const purchasePrice = parseNumber(watch('valuationFinancials.purchasePrice'));
  const marketValue = parseNumber(watch('valuationFinancials.marketValue'));

  const pricePerSqmBuilding = sqmBuilding ? (purchasePrice / sqmBuilding) : 0;
  const pricePerSqmLot = sqmLand ? (purchasePrice / sqmLand) : 0;
  const buildingMarketValuePerSqm = sqmBuilding ? (marketValue / sqmBuilding) : 0;
  const potentialEquityAtClosing = marketValue - purchasePrice;

  const year1Noi = parseNumber(watch('financialRatios.year1Noi'));
  const loanPercent = parseNumber(watch('financialRatios.loanPercent'));
  const repairCost = parseNumber(watch('financialRatios.repairCost'));
  
  const closingCost = purchasePrice * 0.06;
  const investedCash = (purchasePrice * (1 - (loanPercent / 100))) + closingCost + repairCost;
  const debt = purchasePrice * (loanPercent / 100);

  const capRate = purchasePrice ? (year1Noi / purchasePrice) : 0;
  const cashOnCash = investedCash ? (year1Noi / investedCash) : 0;

  useEffect(() => {
    setValue('valuationFinancials.pricePerSqmBuilding', pricePerSqmBuilding);
    setValue('valuationFinancials.pricePerSqmLot', pricePerSqmLot);
    setValue('valuationFinancials.buildingMarketValuePerSqm', buildingMarketValuePerSqm);
    setValue('valuationFinancials.potentialEquityAtClosing', potentialEquityAtClosing);
    
    setValue('financialRatios.closingCost', closingCost);
    setValue('financialRatios.investedCash', investedCash);
    setValue('financialRatios.debt', debt);
    setValue('financialRatios.capRate', capRate);
    setValue('financialRatios.cashOnCash', cashOnCash);
  }, [pricePerSqmBuilding, pricePerSqmLot, buildingMarketValuePerSqm, potentialEquityAtClosing, closingCost, investedCash, debt, capRate, cashOnCash, setValue]);

  const titleType = watch('propertyId.titleType');
  const showTitleDate = ['State Land - Fixed Period State Grant', 'State Land - Registered Lease', 'Tribal Land - Customary Grant (Certificate of Rights)', 'Tribal Land - Common Law Lease'].includes(titleType || '');

  const isOccupiedByTenant = watch('propertyManagementAvailability.isOccupiedByTenant');
  const isProfessionalManagementAvailable = watch('propertyManagementAvailability.isProfessionalManagementAvailable');

  // Local Storage Auto-Save
  useEffect(() => {
    const subscription = watch((value) => {
      if (!id) {
        localStorage.setItem('evaluationDraft', JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, id]);

  useEffect(() => {
    const fetchEvaluation = async () => {
      setInitialLoading(true);
      if (!id) {
        const draft = localStorage.getItem('evaluationDraft');
        if (draft) {
          try {
            reset(JSON.parse(draft));
          } catch (e) {
            console.error("Failed to parse draft", e);
          }
        }
        setInitialLoading(false);
        return;
      }
      try {
        const storedEvals = JSON.parse(localStorage.getItem('savedEvaluations') || '[]');
        const foundEval = storedEvals.find((e: any) => e.id === id);
        if (foundEval) {
          reset(foundEval);
        } else {
          console.log("No such evaluation!");
          navigate('/evaluator');
        }
      } catch (error) {
        console.error("Error fetching local evaluation:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchEvaluation();
  }, [id, reset, navigate]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      // Extract to a readable digest for email
      let emailMessage = `New Property Evaluation Submitted!\n\n`;
      emailMessage += `Property: ${data.propertyId?.address || 'N/A'}\n`;
      emailMessage += `Subdivision: ${data.propertyId?.subdivision || 'N/A'}\n`;
      emailMessage += `Purchase Price: ${data.valuationFinancials?.purchasePrice}\n`;
      emailMessage += `Market Value: ${data.valuationFinancials?.marketValue}\n`;
      emailMessage += `Year 1 NOI: ${data.financialRatios?.year1Noi}\n`;
      emailMessage += `Cap Rate: ${data.financialRatios?.capRate}\n`;
      emailMessage += `\nFull Data Dump:\n${JSON.stringify(data, null, 2)}`;

      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: auth?.currentUser?.email || 'Evaluator User',
          from_email: auth?.currentUser?.email || 'user@example.com',
          message: emailMessage,
          phone: '-',
          property_address: data.propertyId?.address || 'N/A',
          property_type: 'Evaluation Form',
          condition: data.structureConstruction?.generalObservableConditions || '-',
          situation: 'Completed Evaluation'
        },
        EMAILJS_PUBLIC_KEY
      );

      // Save to localStorage
      const storedEvals = JSON.parse(localStorage.getItem('savedEvaluations') || '[]');
      if (id) {
        const index = storedEvals.findIndex((e: any) => e.id === id);
        if (index > -1) {
          storedEvals[index] = { ...storedEvals[index], ...payload };
        } else {
          payload.id = id;
          payload.createdAt = new Date().toISOString();
          storedEvals.push(payload);
        }
      } else {
        payload.id = Date.now().toString();
        payload.createdAt = new Date().toISOString();
        storedEvals.push(payload);
        localStorage.removeItem('evaluationDraft');
      }
      localStorage.setItem('savedEvaluations', JSON.stringify(storedEvals));
      
      alert("Evaluation sent via email and saved locally!");
      navigate('/evaluator');
    } catch (error) {
      console.error("Error saving/emailing evaluation:", error);
      alert("Failed to send/save evaluation.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'propertyId', label: 'Property ID' },
    { id: 'valuationFinancials', label: 'Valuation & Financials' },
    { id: 'operatingCosts', label: 'Monthly Operating Costs' },
    { id: 'structureConstruction', label: 'Structure & Construction' },
    { id: 'interiorSpacesRepairs', label: 'Interior Spaces Repairs' },
    { id: 'finishesFixturesRepairs', label: 'Finishes & Fixtures Repairs' },
    { id: 'mechanicalSystems', label: 'Mechanical Systems' },
    { id: 'conditionCompliance', label: 'Condition & Compliance' },
    { id: 'neighborhoodLocation', label: 'Neighborhood & Location' },
    { id: 'riskAreaAssessment', label: 'Risk & Area Assessment' },
    { id: 'marketInvestmentContext', label: 'Market & Investment Context' },
    { id: 'propertyManagementAvailability', label: 'Property Management Availability' },
    { id: 'financialRatios', label: 'Financial Ratios' },
    { id: 'transactionContact', label: 'Transaction & Contact' },
  ];

  const handleNext = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  if (initialLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/evaluator')} className="flex items-center text-gray-600 hover:text-gray-900">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <h2 className="text-xl font-bold text-gray-900">{id ? 'Edit Evaluation' : 'New Evaluation'}</h2>
        <button 
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        
        {/* Property ID */}
        <div className={activeTab === 'propertyId' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Property ID</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Address" {...register("propertyId.address")} />
            <Input label="Subdivision" {...register("propertyId.subdivision")} />
            <NumberInput label="Year Built" control={control} name="propertyId.yearBuilt" />
            <Input label="Zoning" {...register("propertyId.zoning")} />
            <NumberInput label="SQM Building" control={control} name="propertyId.sqmBuilding" />
            <NumberInput label="SQM Land" control={control} name="propertyId.sqmLand" />
            <Select label="Title Type" {...register("propertyId.titleType")} options={titleOptions} />
            {showTitleDate && <Input label="Date of Title" type="date" {...register("propertyId.titleDate")} />}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Valuation & Financials */}
        <div className={activeTab === 'valuationFinancials' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Valuation & Financials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput label="Purchase Price (BWP)" control={control} name="valuationFinancials.purchasePrice" />
            <NumberInput label="BWP / SQM Building" control={control} name="valuationFinancials.pricePerSqmBuilding" readOnly decimalScale={2} fixedDecimalScale />
            <NumberInput label="BWP / SQM Lot" control={control} name="valuationFinancials.pricePerSqmLot" readOnly decimalScale={2} fixedDecimalScale />
            <NumberInput label="Market Value (BWP)" control={control} name="valuationFinancials.marketValue" />
            <NumberInput label="Building Market Value Per SQM" control={control} name="valuationFinancials.buildingMarketValuePerSqm" readOnly decimalScale={2} fixedDecimalScale />
            <NumberInput label="Potential Equity at Closing (BWP)" control={control} name="valuationFinancials.potentialEquityAtClosing" readOnly decimalScale={2} fixedDecimalScale />
            <NumberInput label="Potential Monthly Rent After Repairs (BWP)" control={control} name="valuationFinancials.potentialMonthlyRentAfterRepairs" />
            <Select label="Airbnb Potential" {...register("valuationFinancials.airbnbPotential")} options={["High", "Medium", "Low", "None", "Missing", "N/A"]} />
            <Select label="Exit Strategy" {...register("valuationFinancials.exitStrategy")} options={exitStrategyOptions} />
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Operating Costs */}
        <div className={activeTab === 'operatingCosts' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Monthly Operating Costs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput label="Real Estate Tax" control={control} name="operatingCosts.realEstateTax" />
            <NumberInput label="Trash Cost" control={control} name="operatingCosts.trashCost" />
            <NumberInput label="Lawn" control={control} name="operatingCosts.lawn" />
            <NumberInput label="Water Bill" control={control} name="operatingCosts.waterBill" />
            <NumberInput label="Maintenance" control={control} name="operatingCosts.maintenance" />
            <NumberInput label="Flood Insurance" control={control} name="operatingCosts.floodInsurance" />
            <NumberInput label="Liability Insurance" control={control} name="operatingCosts.liabilityInsurance" />
            <NumberInput label="Homeowner / Hazard Insurance" control={control} name="operatingCosts.homeownerHazardInsurance" />
            <NumberInput label="Home Association Fee" control={control} name="operatingCosts.homeAssociationFee" />
            <NumberInput label="Deferred Maintenance" control={control} name="operatingCosts.deferredMaintenance" />
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Structure & Construction */}
        <div className={activeTab === 'structureConstruction' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Structure & Construction</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Foundations" {...register("structureConstruction.foundations")} options={conditionOptions} />
            <Select label="Construction Material & Quality" {...register("structureConstruction.constructionMaterialQuality")} options={conditionOptions} />
            <Select label="Blocks / Cement" {...register("structureConstruction.blocksCement")} options={conditionOptions} />
            <Select label="Insulation" {...register("structureConstruction.insulation")} options={conditionOptions} />
            <Select label="Attic" {...register("structureConstruction.attic")} options={conditionOptions} />
            <Select label="Roof" {...register("structureConstruction.roof")} options={conditionOptions} />
            <Select label="Driveway" {...register("structureConstruction.driveway")} options={conditionOptions} />
            <Input label="General Observable Conditions" {...register("structureConstruction.generalObservableConditions")} />
            
            <div className="md:col-span-2 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3 border-b pb-2">Systems at End of Lifespan</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {systemsList.map(sys => (
                  <Checkbox key={sys} label={sys} value={sys} {...register("structureConstruction.systemsEndLifespan")} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Interior Spaces Repairs */}
        <div className={activeTab === 'interiorSpacesRepairs' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Interior Spaces Repairs</h3>
          <p className="text-sm text-gray-500 mb-4">Evaluate the overall condition of each room.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interiorRooms.map(room => (
              <Select key={room} label={room} {...register(`interiorSpacesRepairs.${room.replace(/\s+/g, '')}`)} options={conditionOptions} />
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Finishes & Fixtures Repairs */}
        <div className={activeTab === 'finishesFixturesRepairs' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Finishes & Fixtures Repairs</h3>
          <p className="text-sm text-gray-500 mb-6">Evaluate the specific finishes for each interior space.</p>
          
          <div className="space-y-8">
            {interiorRooms.map(room => (
              <div key={room} className="border p-5 rounded-xl bg-gray-50 border-gray-200">
                <h4 className="font-bold mb-4 text-blue-900 text-lg">{room} Finishes</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getFinishesForRoom(room).map(finish => (
                    finish === 'General Observable Conditions' ? 
                      <Input key={finish} label={finish} {...register(`finishesFixturesRepairs.${room.replace(/\s+/g, '')}.generalObservableConditions`)} /> :
                      <Select key={finish} label={finish} options={conditionOptions} {...register(`finishesFixturesRepairs.${room.replace(/\s+/g, '')}.${finish.replace(/[^a-zA-Z0-9]/g, '')}`)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Mechanical Systems */}
        <div className={activeTab === 'mechanicalSystems' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Mechanical Systems</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Electrical" {...register("mechanicalSystems.electrical")} options={conditionOptions} />
            <Select label="Plumbing" {...register("mechanicalSystems.plumbing")} options={conditionOptions} />
            <Select label="Sewer" {...register("mechanicalSystems.sewer")} options={conditionOptions} />
            <Select label="Metered Water" {...register("mechanicalSystems.meteredWater")} options={conditionOptions} />
            <Select label="Metered Electricity" {...register("mechanicalSystems.meteredElectricity")} options={conditionOptions} />
            <Select label="Metered Gas" {...register("mechanicalSystems.meteredGas")} options={conditionOptions} />
            <Input label="General Observable Conditions" {...register("mechanicalSystems.generalObservableConditions")} />
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Condition & Compliance */}
        <div className={activeTab === 'conditionCompliance' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Condition & Compliance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Other Necessary Upgrades" {...register("conditionCompliance.otherNecessaryUpgrades")} />
            <Input label="Other Repairs" {...register("conditionCompliance.otherRepairs")} />
            <Select label="Pest Inspection" {...register("conditionCompliance.pestInspection")} options={["Clear", "Issues Found", "Not Done", "Missing", "N/A"]} />
            <Input label="Building Permit History" {...register("conditionCompliance.buildingPermitHistory")} />
            <Checkbox label="Open Building Permits" {...register("conditionCompliance.openBuildingPermits")} />
            <Checkbox label="Building Violations" {...register("conditionCompliance.buildingViolations")} />
            <Input label="Seller Damage Disclosures" {...register("conditionCompliance.sellerDamageDisclosures")} />
            <Checkbox label="Home / Construction Warranty" {...register("conditionCompliance.homeConstructionWarranty")} />
            <Checkbox label="Flood Zone" {...register("conditionCompliance.floodZone")} />
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Neighborhood & Location */}
        <div className={activeTab === 'neighborhoodLocation' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Neighborhood & Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Landscaping" {...register("neighborhoodLocation.landscaping")} options={conditionOptions} />
            <Select label="Transportation" {...register("neighborhoodLocation.transportation")} options={conditionOptions} />
            <Select label="Elementary Schools" {...register("neighborhoodLocation.elementarySchools")} options={conditionOptions} />
            <Select label="Services Nearby" {...register("neighborhoodLocation.servicesNearby")} options={conditionOptions} />
            <Input label="General Observable Conditions" {...register("neighborhoodLocation.generalObservableConditions")} />
            
            <div className="md:col-span-2 mt-4">
              <h4 className="font-medium text-gray-900 mb-3 border-b pb-2">Amenities Distance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select label="Shopping Mall" {...register("neighborhoodLocation.shoppingMall")} options={distanceOptions} />
                <Select label="Bus Stop" {...register("neighborhoodLocation.busStop")} options={distanceOptions} />
                <Select label="Hospital" {...register("neighborhoodLocation.hospital")} options={distanceOptions} />
                <Select label="Schools" {...register("neighborhoodLocation.schools")} options={distanceOptions} />
                <Select label="Playgrounds" {...register("neighborhoodLocation.playgrounds")} options={distanceOptions} />
                <Select label="Pedestrian Area" {...register("neighborhoodLocation.pedestrianArea")} options={distanceOptions} />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Risk & Area Assessment */}
        <div className={activeTab === 'riskAreaAssessment' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Risk & Area Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Crime Rating" {...register("riskAreaAssessment.crimeRating")} options={["Low", "Medium", "High", "Missing", "N/A"]} />
            <Input label="Vacancy Duration (Area)" {...register("riskAreaAssessment.vacancyDuration")} />
            <Select label="Traffic" {...register("riskAreaAssessment.traffic")} options={["Light", "Moderate", "Heavy", "Missing", "N/A"]} />
            <Checkbox label="Construction Area Nearby" {...register("riskAreaAssessment.constructionAreaNearby")} />
            <Input label="Redevelopment Plans" {...register("riskAreaAssessment.redevelopmentPlans")} />
            <Input label="Street History" {...register("riskAreaAssessment.streetHistory")} />
            <Input label="Council Representative" {...register("riskAreaAssessment.councilRepresentative")} />
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Market & Investment Context */}
        <div className={activeTab === 'marketInvestmentContext' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Market & Investment Context</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput label="Comparable Property's Price in Area (BWP)" control={control} name="marketInvestmentContext.comparablePropertyPrice" />
            <Input label="Mobility / Migratory Patterns" {...register("marketInvestmentContext.mobilityMigratoryPatterns")} />
            <Select label="Home Association" {...register("marketInvestmentContext.homeAssociation")} options={yesNoOptions} />
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Property Management Availability */}
        <div className={activeTab === 'propertyManagementAvailability' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Property Management Availability in Area</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Is This Property Occupied By Tenant" {...register("propertyManagementAvailability.isOccupiedByTenant")} options={yesNoUnknownOptions} />
            {isOccupiedByTenant === 'Yes' && (
              <NumberInput label="How Much is current monthly rent? (BWP)" control={control} name="propertyManagementAvailability.currentMonthlyRent" />
            )}
            <Select label="Is Professional Rental Property Management Available Within 1 KM" {...register("propertyManagementAvailability.isProfessionalManagementAvailable")} options={yesNoUnknownOptions} />
            {isProfessionalManagementAvailable === 'Yes' && (
              <Select label="Quality of Management Services" {...register("propertyManagementAvailability.qualityOfManagementServices")} options={["Excellent", "Good", "Fair", "Poor", "Missing", "N/A"]} />
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Financial Ratios */}
        <div className={activeTab === 'financialRatios' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Financial Ratios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-900 border-b pb-2">Inputs</h4>
              <NumberInput label="Year 1 Net Operating Income (NOI) (BWP)" control={control} name="financialRatios.year1Noi" />
              <NumberInput label="Purchase Price (BWP)" control={control} name="valuationFinancials.purchasePrice" readOnly />
              <NumberInput label="Loan %" control={control} name="financialRatios.loanPercent" />
              <NumberInput label="Repair Cost (BWP)" control={control} name="financialRatios.repairCost" />
            </div>
            <div className="space-y-4 bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h4 className="font-bold text-blue-900 border-b border-blue-200 pb-2">Computed Ratios</h4>
              <NumberInput label="Closing Cost (BWP)" control={control} name="financialRatios.closingCost" readOnly decimalScale={2} fixedDecimalScale />
              <NumberInput label="Invested Cash (BWP)" control={control} name="financialRatios.investedCash" readOnly decimalScale={2} fixedDecimalScale />
              <NumberInput label="Debt (BWP)" control={control} name="financialRatios.debt" readOnly decimalScale={2} fixedDecimalScale />
              
              <div className="pt-4 border-t border-blue-200">
                <NumberInput label="Capitalization Rate" control={control} name="financialRatios.capRate" readOnly decimalScale={4} fixedDecimalScale className="bg-white font-mono" />
                <p className="text-xs text-blue-700 mt-1 mb-3">Formula: Year 1 NOI / Purchase Price</p>
                
                <NumberInput label="Cash-on-Cash Return" control={control} name="financialRatios.cashOnCash" readOnly decimalScale={4} fixedDecimalScale className="bg-white font-mono" />
                <p className="text-xs text-blue-700 mt-1 mb-3">Formula: Year 1 NOI / Invested Cash</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-200">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Transaction & Contact */}
        <div className={activeTab === 'transactionContact' ? 'block' : 'hidden'}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Transaction & Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Name" {...register("transactionContact.name")} />
            <Input label="Phone" {...register("transactionContact.phone")} />
            <Input label="Delivery Date" type="date" {...register("transactionContact.deliveryDate")} />
          </div>
        </div>

      </form>
    </div>
  );
};

// Form Components
const Input = React.forwardRef<HTMLInputElement, any>(({ label, type = "text", className = "", ...props }, ref) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      ref={ref}
      {...props}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${className}`}
    />
  </div>
));

const NumberInput = ({ label, control, name, readOnly = false, className = "", ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <NumericFormat
          getInputRef={ref}
          value={value}
          onValueChange={(values) => {
            onChange(values.value);
          }}
          thousandSeparator={true}
          readOnly={readOnly}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${readOnly ? 'bg-gray-50' : ''} ${className}`}
          {...props}
        />
      )}
    />
  </div>
);

const Select = React.forwardRef<HTMLSelectElement, any>(({ label, options, className = "", ...props }, ref) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      ref={ref}
      {...props}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white ${className}`}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
));

const Checkbox = React.forwardRef<HTMLInputElement, any>(({ label, ...props }, ref) => (
  <div className="flex items-center h-full pt-2">
    <input
      type="checkbox"
      ref={ref}
      {...props}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label className="ml-2 block text-sm text-gray-900">{label}</label>
  </div>
));

export default EvaluationForm;