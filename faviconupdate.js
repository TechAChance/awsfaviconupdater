function updateFavicon() {
  const SERVICES = [
    //"budgets", // TODO: This has a special URL (console.aws.amazon.com/billing/home?#/budgets)
    //"directoryservice", // Amazon did this one!
    //"ec2",
    //"greengrass", // unique URL
    //"iam", // Amazon did this one!
    //"lambda", // Amazon did this one!
    //"macie", // unique URL
    //"mobilehub",
    //"secretsmanager", // Amazon did this one!
    //"singlesignon", // Amazon did this one!
    //"vpc",
    "a2i",
    "a4b",
    "acm",
    "amazon-mq",
    "amplify",
    // "apigateway", // Amazon did this one!
    "app2container",
    "appflow",
    "appmesh",
    "apprunner",
    "appstream2",
    "appsync",
    "artifact",
    "athena",
    "auditmanager",
    "augmented-ai",
    "aurora",
    "awsautoscaling",
    "backup",
    "batch",
    "billing",
    "braket",
    "chatbot",
    "chime",
    "cloud9",
    "cloudformation",
    "cloudfront",
    "cloudhsm",
    "cloudmap",
    "cloudsearch",
    // "cloudshell", // Amazon did this one!
    "cloudtrail",
    // "cloudwatch", // Amazon did this one!
    "codeartifact",
    "codebuild",
    "codecommit",
    "codedeploy",
    "codeguru",
    "codepipeline",
    "codestar",
    "comprehend",
    "config",
    "connect",
    "console",
    "containers",
    "controltower",
    "corretto",
    "cost-management",
    "cost-reports",
    // "dataexchange", // Amazon did this one!
    "datapipeline",
    "datasync",
    "deepcomposer",
    "deeplens",
    "deepracer",
    "detective",
    "devicefarm",
    "devops-guru",
    "directconnect",
    "directoryservice",
    "discovery",
    "dms",
    "documentdb",
    "drs",
    // "dynamodb", // Amazon did this one!
    //"ec2",
    "ec2sp",
    "ecr",
    "ecs",
    "efs",
    "eks",
    "elasticache",
    "elasticbeanstalk",
    "elasticmapreduce",
    "elastictranscoder",
    "elb",
    "elemental-appliances-software",
    "emr",
    "esv3",
    "eventbridge",
    "fargate",
    "finspace",
    "firewallmanager",
    "fis",
    "fmsv2",
    "forecast",
    "frauddetector",
    "fsx",
    "gamelift",
    "glacier",
    "globalaccelerator",
    "glue",
    "grafana",
    "greengrass",
    "groundstation",
    "guardduty",
    "healthlake",
    "iam",
    "inspector",
    "iot",
    "iot1click",
    "iotanalytics",
    "iotevents",
    "iotfleetwise",
    "iotroborunner",
    "iotsitewise",
    "iottwinmaker",
    "ivs",
    "kendra",
    "keyspaces",
    "kinesis",
    "kinesisdata",
    "kinesisfirehose",
    "kinesisvideo",
    "kms",
    "lake-formation",
    "lambda",
    "launchwizard",
    "lex",
    "license-manager",
    "lightsail",
    // "location", // Amazon did this one!
    "lookoutequipment",
    "lookoutmetrics",
    "lookoutvision",
    // "ls", // Amazon did this one!
    "m2",
    "machinelearning",
    "macie",
    "managed-blockchain",
    "managed-services",
    "marketplace",
    "mediaconnect",
    "mediaconvert",
    "medialive",
    "mediapackage",
    "mediastore",
    "mediatailor",
    "memorydb",
    "mgn",
    "migrationhub",
    "monitron",
    "msk",
    "neptune",
    "nimblestudio",
    "opensearch-service",
    "opsworks",
    "organizations",
    "outpost",
    "panorama",
    "personalize",
    "phd",
    "pinpoint",
    "polly",
    "prometheus",
    "proton",
    "qldb",
    "quicksight",
    "ram",
    "rds",
    "redshift",
    "rekognition",
    "resiliencehub",
    "robomaker",
    "rosa",
    "route53",
    "s3",
    "sagemaker",
    "secretsmanager",
    "securityhub",
    "serverless",
    "servermigration",
    "servicecatalog",
    "ses",
    "shield",
    "shieldv2",
    "signer",
    "singlesignon",
    "snow",
    "sns",
    "sqs",
    "sso",
    "states",
    "step-functions",
    "storagegateway",
    "sumerian",
    "systems-manager",
    "textract",
    "thingsgraph",
    "timestream",
    "transcribe",
    "transfer",
    "translate",
    "trustedadvisor",
    "vmware",
    //"vpc",
    "waftool",
    "wafv2",
    "wavelength",
    "wellarchitected",
    "workdocs",
    "worklink",
    "workmail",
    "workspaces",
    "xray",

  ];
  // Look for the string blocks right after the 'amazon.com/' (ec2/s3/iam/ses/etc...)
  let reg = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/*/g;
  let reg_ec2_and_vpc = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-zA-Z0-9\.\-\#\:\?\=]*)\/*/g;
  let reg_full = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-zA-Z0-9\.\-\#\:\?\=]*)*/g;

  // Break the URL into parts and capture the string after the 'amazon.com/' as awsServiceName
  let captureGroupArray = Array.from(document.URL.matchAll(reg));
  // Note:  This is just to keep my sanity in check.  Most URLs follow the format at the top.  These follow others.
  let captureGroupArrayEC2AndVPC = Array.from(document.URL.matchAll(reg_ec2_and_vpc));
  let captureGroupArrayLong = Array.from(document.URL.matchAll(reg_full));

  let domain = captureGroupArray[0][1];

  if (domain !== "docs.aws.amazon.com") {
    let awsServiceName = captureGroupArray[0][2];
    let subAWSServiceName = captureGroupArray[0][3];

    // For Codesuite URLs (Codebuild/CodeDeploy/CodePipeline/etc...), we need to break the URL apart further to work
    if (awsServiceName == 'codesuite') {
      awsServiceName = subAWSServiceName
    }
    if (awsServiceName == 'wafv2' && subAWSServiceName !== 'homev2') {
      awsServiceName = subAWSServiceName
    }

    let awsService = awsServiceName + ".png";
    let iconName = ''
    // We have found a match in the URL!
    if (SERVICES.includes(awsServiceName)) {

      iconName = awsService

    } else if (awsServiceName === 'ec2') {
      // There is a "v2" url for a bunch of these, and it flips on and off for no reason.  Check for this.
      let endOfURL = ""
      let prefix = "ec2_"
      awsServiceName = 'ec2';

      if (captureGroupArray[0][3] == "v2") {
        endOfURL = captureGroupArrayLong[0][4]
      } else {
        endOfURL = captureGroupArrayEC2AndVPC[0][3]
      }

      if (endOfURL.includes('AutoScalingGroups')) {
        awsServiceName = 'AutoScalingGroups';
      } else if (endOfURL.includes('Addresses')) {
        awsServiceName = 'Addresses';
      } else if (endOfURL.includes('LoadBalancers')) {
        awsServiceName = 'LoadBalancers';
      } else if (endOfURL.includes('Images')) {
        awsServiceName = 'Images';
      } else if (endOfURL.includes('Instances')) {
        awsServiceName = 'Instances';
      } else if (endOfURL.includes('NIC')) {
        awsServiceName = 'NIC';
      } else {
        prefix = ''
      }

      iconName = prefix + awsServiceName + ".png";

    } else if (awsServiceName === 'vpc') {

      let awsServiceName = captureGroupArrayEC2AndVPC[0][3];
      let prefix = "vpc_"
      awsServiceName = 'vpc';

      if (awsServiceName.includes('RouteTables')) {
        awsServiceName = 'RouteTables';
      } else if (awsServiceName.includes('igws')) {
        awsServiceName = 'igws';
      } else if (awsServiceName.includes('Addresses')) {
        awsServiceName = 'Addresses';
      } else if (awsServiceName.includes('Endpoints')) {
        awsServiceName = 'Endpoints';
      } else if (awsServiceName.includes('NatGateways')) {
        awsServiceName = 'NatGateways';
      } else if (awsServiceName.includes('PeeringConnections')) {
        awsServiceName = 'PeeringConnections';
      } else if (awsServiceName.includes('acls')) {
        awsServiceName = 'acls';
      } else if (awsServiceName.includes('CustomerGateways')) {
        awsServiceName = 'CustomerGateways';
      } else {

        prefix = ''
      }

      iconName = prefix + awsServiceName + ".png";
    }

    if (iconName !== '') {
      console.log(iconName)

      // Get all the <link> tags
      let faviconPresent = false;
      let linkElements = document.getElementsByTagName('link');
      for (let i = 0; i < linkElements.length; i++) {
        // There are 2 tags that control the favicon.  Update them to be the correct favicon
        if (['icon', 'shortcut icon'].includes(linkElements[i].getAttribute('rel'))) {
          // Favicon exists, update it
          linkElements[i].setAttribute('type', 'image/png');
          linkElements[i].setAttribute('href', chrome.runtime.getURL("icons/" + iconName));
          faviconPresent = true
        }
      }

      if (!faviconPresent) {

        // No favicon exists, create it
        let iconNode = document.createElement('link');
        iconNode.setAttribute('rel', 'icon');
        iconNode.setAttribute('type', 'image/png');
        iconNode.setAttribute('href', chrome.runtime.getURL("icons/" + iconName));
        console.log(iconNode)
        let shortcutIconNode = document.createElement('link');
        shortcutIconNode.setAttribute('rel', 'shortcut icon');
        shortcutIconNode.setAttribute('type', 'image/png');
        shortcutIconNode.setAttribute('href', chrome.runtime.getURL("icons/" + iconName));
        console.log(shortcutIconNode)

        // Add the tags we just made to the head tag
        document.getElementsByTagName('head')[0].appendChild(iconNode);
        document.getElementsByTagName('head')[0].appendChild(shortcutIconNode);
      }
    }
  }
}
updateFavicon()
