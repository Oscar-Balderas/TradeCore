import { useState } from "react";
import "./MarketGuide.css";

const guideSections = [
  {
    title: "What is TradeCore?",
    content: (
      <>
        <p>
          TradeCore is an international trade management platform designed to
          register commercial operations and explore international commodity
          market prices.
        </p>
        <p>
          Users can manage trade operations, review commodity reference prices
          and study historical market trends.
        </p>
        <p>
          Market prices are provided for informational purposes and do not
          constitute binding purchase or sale offers.
        </p>
      </>
    ),
  },
  {
    title: "Understanding price sources and benchmarks",
    content: (
      <>
        <p>
          A data source identifies where market information comes from. A
          benchmark is a specific price reference or methodology that may be
          used in commercial contracts.
        </p>

        <ul>
          <li>
            <strong>World Bank Pink Sheet:</strong> Publishes international
            commodity reference prices, primarily on a monthly basis.
          </li>
          <li>
            <strong>EIA:</strong> The U.S. Energy Information Administration
            publishes energy market statistics and price series.
          </li>
          <li>
            <strong>Platts:</strong> Publishes specialized commodity price
            assessments and benchmarks.
          </li>
          <li>
            <strong>Argus:</strong> Publishes commodity price assessments and
            market indexes.
          </li>
          <li>
            <strong>LBMA:</strong> The London Bullion Market Association is
            associated with precious metals market standards and benchmarks.
          </li>
        </ul>

        <p>
          Important: A World Bank reference price should not automatically be
          identified as a Platts, Argus or LBMA benchmark.
        </p>
      </>
    ),
  },
  {
    title: "Understanding commodity price units",
    content: (
      <>
        <ul>
          <li>
            <strong>USD/bbl:</strong> U.S. dollars per barrel. One petroleum
            barrel is approximately 159 liters.
          </li>
          <li>
            <strong>USD/MMBtu:</strong> U.S. dollars per million British thermal
            units, a measure of energy.
          </li>
          <li>
            <strong>USD/troy oz:</strong> U.S. dollars per troy ounce. One troy
            ounce equals approximately 31.1035 grams.
          </li>
          <li>
            <strong>USD/mt:</strong> U.S. dollars per metric ton. One metric ton
            equals 1,000 kilograms.
          </li>
          <li>
            <strong>USD/dmt:</strong> U.S. dollars per dry metric ton, commonly
            used for mineral commodities.
          </li>
          <li>
            <strong>USD/kg:</strong> U.S. dollars per kilogram.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How are commodity prices determined?",
    content: (
      <>
        <p>
          Commodity contracts may use an agreed benchmark, a pricing period and
          a premium or discount.
        </p>

        <p>
          For example, a petroleum contract might reference a published price
          assessment plus or minus an agreed differential.
        </p>

        <p>
          The final commercial price can also depend on product specifications,
          delivery location, Incoterms, transportation and insurance.
        </p>
      </>
    ),
  },
  {
    title: "Example: calculating a trade operation",
    content: (
      <>
        <p>
          Suppose a buyer purchases 100 metric tons of copper at an illustrative
          reference price of USD 10,000/mt.
        </p>

        <div className="market-guide-example">
          <p>Quantity: 100 mt</p>
          <p>Reference price: USD 10,000/mt</p>
          <strong>Indicative value: USD 1,000,000</strong>
        </div>

        <p>
          This calculation is illustrative. The final transaction value depends
          on the agreed contract terms.
        </p>
      </>
    ),
  },
];

function MarketGuide() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <section className="market-guide">
      <div className="market-guide-header">
        <span className="market-guide-label">COMMODITY MARKET EDUCATION</span>

        <h2>Market Guide</h2>

        <p>
          Learn how to interpret commodity prices, market benchmarks and
          international trade terminology.
        </p>
      </div>

      <div className="market-guide-sections">
        {guideSections.map((section, index) => (
          <div className="market-guide-item" key={section.title}>
            <button
              type="button"
              className="market-guide-question"
              onClick={() => toggleSection(index)}
              aria-expanded={activeSection === index}
            >
              <span>{section.title}</span>
              <span>{activeSection === index ? "−" : "+"}</span>
            </button>

            {activeSection === index && (
              <div className="market-guide-answer">{section.content}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default MarketGuide;
