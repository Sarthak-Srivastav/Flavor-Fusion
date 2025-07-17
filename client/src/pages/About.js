import React from "react";
import Layout from "../components/layout/layout";

const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row about ">
        <div className="col-md-6 ">
          <img
            src="/images/contact-2.jpg"
            alt="contactus"
            style={{ width: "94%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="c-text bg-dark p-2 text-white text-center">
            ABOUT US
          </h1>
          <p className="text-black text-justify mt-3 ">
            <p>
              Welcome to Flavor Fusion: We're thrilled to have you join us on
              our culinary journey!.
            </p>
          </p>
          <p className="text-black text-justify mt-2">
            <b>OUR STORY : </b>
            <br />
            Flavor Fusion Was Born Out Of A Shared Passion For Cooking. Our Team
            Of Food Enthusiasts Came Together To Create A Platform Where
            Everyone, From Beginners To Seasoned Chefs, Can Find Inspiration And
            Joy In The Kitchen.
          </p>
          <p className="text-black text-justify mt-2">
            <b>WILD VARIETY : </b>
            <br />
            Explore Our Diverse Collection Of Recipes, Carefully Curated To
            Cater To Every Taste Bud And Dietary Preference. Whether You're
            Craving Comfort Food Classics, Exploring International Cuisines, Or
            Looking For Healthy Meal Options, We've Got Something For You.
          </p>

          <p className="text-black text-justify mt-2">
            <b>LETS GET COOKING ! </b>
            <br />
            Whether You're Whipping Up A Quick Weeknight Dinner Or Preparing An
            Elaborate Feast For A Special Occasion, Let Flavor Fusion Be Your
            Go-to Destination For Culinary Inspiration And Satisfaction. Happy
            Cooking!
          </p>
          <p className="text-black text-justify mt-2">
            <b>QUALITY MATTERS : </b>
            <br />
            Every Recipe On Flavor Fusion Undergoes Rigorous
            Testing And Refinement By Our Culinary Experts To Ensure That You
            Achieve Delicious Results Every Time You Cook.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
