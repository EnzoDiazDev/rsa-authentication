// eslint-disable-next-line @typescript-eslint/no-var-requires
if(process.env.NODE_ENV === "development") require("dotenv").config();
import Lepp from "@enzodiazdev/lepp";
import Authentication from "./Authentication";
import FooBar from "./FooBar";

class Main {
    public static main():void {
        const lepp = new Lepp(3002);

        lepp.use_helmet()
            .use_bodyparser()
            .use_morgan("tiny");

        lepp.use_default_routes();

        lepp.add_extension(Authentication)
            .add_extension(FooBar);

        lepp.run();
    }
}

Main.main();
