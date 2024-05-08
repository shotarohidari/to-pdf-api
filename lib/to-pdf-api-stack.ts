import * as cdk from "aws-cdk-lib"
import { Duration } from "aws-cdk-lib"
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"

export class ToPdfApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const fn = new NodejsFunction(this, "lambda", {
      entry: "lib/lambda/index.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.minutes(3),
      memorySize: 512,
      bundling: {
        nodeModules: ["@sparticuz/chromium"],
      },
    })

    fn.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    })
  }
}
