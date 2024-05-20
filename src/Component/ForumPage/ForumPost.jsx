import * as React from "react";
import styled from "styled-components";


function Forum() {
  return (
    <Div>
      <Div2>
        <Div3>
          <Div4>
            <Img
              loading="lazy"
              srcSet="..."
            />
            <Div5>
              <Div6>
                <Div7>juliechang</Div7>
              </Div6>
              <Div8>
                <Div9>1.2M views</Div9>
              </Div8>
            </Div5>
          </Div4>
        </Div3>
        <Div10>
          <Div11>Vegan and gluten free chocolate chip cookies</Div11>
        </Div10>
        <Div12>
          <Div13>
            I spent the last 3 years perfecting the vegan and gluten free
            chocolate chip cookie recipe. I am so excited to share it with you
            all!
          </Div13>
        </Div12>
        <Div14>
          <Div15>
            <Img2
              loading="lazy"
              srcSet="..."
            />
          </Div15>
        </Div14>
        <Div16>
          <Div17>
            <Div18>
              <Img3
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/92cc387e91c451152d87ad4a4477487c3b943b350dba17e8885cdb6bc6cea878?"
              />
            </Div18>
            <Div19>
              <Div20>6.2k</Div20>
            </Div19>
          </Div17>
          <Div21>
            <Div22>
              <Img4
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f46d6904a564fd9923f86bc4ed09579895a6bda2a00b84bd9f358f882644aa91?"
              />
            </Div22>
            <Div23>
              <Div24>1.2k</Div24>
            </Div23>
          </Div21>
          <Div25>
            <Div26>
              <Img5
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d127a4b97dcefd61bf610d11fa7d687186d598aa73b8f63204c97b75e183c97?"
              />
            </Div26>
            <Div27>
              <Div28>1.1k</Div28>
            </Div27>
          </Div25>
          <Div29>
            <Div30>
              <Img6
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/94f0b5aef2f3abe92bee07900729bcddb42618890771f1d21deb13a1eb8cd193?"
              />
            </Div30>
            <Div31>
              <Div32>1.2k</Div32>
            </Div31>
          </Div29>
        </Div16>
      </Div2>
    </Div>
  );
}

const Div = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  padding: 20px 60px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const Div2 = styled.div`
  display: flex;
  width: 512px;
  max-width: 100%;
  flex-direction: column;
  padding: 20px 0;
`;

const Div3 = styled.div`
  justify-content: center;
  background-color: #f7fafc;
  display: flex;
  flex-direction: column;
  line-height: 150%;
  padding: 8px 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div4 = styled.div`
  display: flex;
  padding-right: 80px;
  gap: 16px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding-right: 20px;
  }
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 56px;
`;

const Div5 = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;

const Div6 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #0d141c;
  font-weight: 500;
  white-space: nowrap;
  justify-content: center;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div7 = styled.div`
  font-feature-settings: "dlig" on;
  font-family: Plus Jakarta Sans, sans-serif;
  justify-content: center;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div8 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #4f7396;
  font-weight: 400;
  justify-content: center;
`;

const Div9 = styled.div`
  font-feature-settings: "dlig" on;
  font-family: Plus Jakarta Sans, sans-serif;
  justify-content: center;
`;

const Div10 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 28px;
  color: #0d141c;
  font-weight: 700;
  letter-spacing: -0.7px;
  padding: 20px 16px 12px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div11 = styled.div`
  font-feature-settings: "dlig" on;
  font-family: Plus Jakarta Sans, sans-serif;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div12 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #0d141c;
  font-weight: 400;
  line-height: 150%;
  padding: 4px 16px 12px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div13 = styled.div`
  font-feature-settings: "dlig" on;
  font-family: Plus Jakarta Sans, sans-serif;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const Div14 = styled.div`
  background-color: #f7fafc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div15 = styled.div`
  justify-content: center;
  border-radius: 12px;
  background-color: #f7fafc;
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Img2 = styled.img`
  aspect-ratio: 1.49;
  object-fit: auto;
  object-position: center;
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div16 = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 8px 16px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Div17 = styled.div`
  justify-content: center;
  display: flex;
  gap: 8px;
  flex: 1;
  padding: 8px 12px;
`;

const Div18 = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Img3 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
`;

const Div19 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #4f7396;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.19px;
  line-height: 150%;
  justify-content: center;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div20 = styled.div`
  font-feature-settings: "dlig" on;
  font-family: Plus Jakarta Sans, sans-serif;
  justify-content: center;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div21 = styled.div`
  justify-content: center;
  display: flex;
  gap: 8px;
  flex: 1;
  padding: 8px 12px;
`;

const Div22 = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Img4 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
`;

const Div23 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #4f7396;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.19px;
  line-height: 150%;
  justify-content: center;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div24 = styled.div`
  font-feature-settings: "dlig" on;
  font-family: Plus Jakarta Sans, sans-serif;
  justify-content: center;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div25 = styled.div`
  justify-content: center;
  display: flex;
  gap: 8px;
  flex: 1;
  padding: 8px 12px;
`;

const Div26 = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Img5 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
`;

const Div27 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #4f7396;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.19px;
  line-height: 150%;
  justify-content: center;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div28 = styled.div`
  font-feature-settings: "dlig" on;
  font-family: Plus Jakarta Sans, sans-serif;
  justify-content: center;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div29 = styled.div`
  justify-content: center;
  display: flex;
  gap: 8px;
  flex: 1;
  padding: 8px 12px;
`;

const Div30 = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Img6 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
`;

const Div31 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #4f7396;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.19px;
  line-height: 150%;
  justify-content: center;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div32 = styled.div`
  font-feature-settings: "dlig" on;
  font-family: Plus Jakarta Sans, sans-serif;
  justify-content: center;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

export default Forum;

