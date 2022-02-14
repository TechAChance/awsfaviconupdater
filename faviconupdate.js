// Define all the AWS services here
const SERVICES = [
	//"a4b", // Amazon did this one!
	"acm",
	"amazon-mq",
	"apigateway",
	"appsync",
	"artifact",
	"athena",
	"awsautoscaling",
	"batch",
	"billing",
	//"budgets", // TODO: This has a special URL (console.aws.amazon.com/billing/home?#/budgets)
	"cloud9",
	"cloudformation",
	"cloudfront",
	"cloudhsm",
	"cloudsearch",
	"cloudtrail",
	"cloudwatch",
	"codebuild",
	"codecommit",
	"codedeploy",
	"codepipeline",
	"codestar",
	"comprehend",
	//"cognito", // Amazon did this one!
	"config",
	"connect",
	"console",
	"cost-reports",
	"datapipeline",
	"deeplens",
	"directconnect",
	//"directoryservice", // Amazon did this one!
	"devicefarm",
	"discovery",
	"dms",
	"dynamodb",
	//"ec2",
	"ec2sp",
	"esv3",
	"efs",
	"ecs",
	"ecr",
	"eks",
	"elasticache",
	"elastictranscoder",
	"elasticbeanstalk",
	"elasticmapreduce",
	"glacier",
	"gamelift",
	"glue",
	//"greengrass", // unique URL
	"guardduty",
	//"iam", // Amazon did this one!
	"iot",
	"iotsitewise",
	"importexport",
	"inspector",
	"kinesis",
	"kinesisvideo",
	"kms",
	//"lambda", // Amazon did this one!
	"lex",
	"ls",
	//"macie", // unique URL
	"machinelearning",
	"managed-services",
	"mediaconvert",
	"medialive",
	"mediapackage",
	"mediastore",
	"mediatailor",
	"migrationhub",
	//"mobilehub",
	"neptune",
	"opsworks",
	"pinpoint",
	"polly",
	"rds",
	"redshift",
	"rekognition",
	"route53",
	"s3",
	"sagemaker",
	//"secretsmanager", // Amazon did this one!
	"servermigration",
	"servicecatalog",
	"ses",
	"sns",
	//"singlesignon", // Amazon did this one!
	"sqs",
	"states",
	"storagegateway",
	"sumerian",
	"systems-manager",
	"translate",
	"transcribe",
	"trustedadvisor",
	"swf",
	"waf",
	"wafv2",
	"workspaces",
	"workmail",
	//"vpc",
	"xray"
];

// Look for the string blocks right after the 'amazon.com/' (ec2/s3/iam/ses/etc...)
let reg = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/*/g;
let reg_ec2_and_vpc = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-zA-Z0-9\.\-\#\:\?\=]*)\/*/g;
let reg_full = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-zA-Z0-9\.\-\#\:\?\=]*)*/g;

// Break the URL into parts and capture the string after the 'amazon.com/' as awsServiceName
let captureGroupArray = Array.from( document.URL.matchAll(reg) );
// Note:  This is just to keep my sanity in check.  Most URLs follow the format at the top.  These follow others.
let captureGroupArrayEC2AndVPC = Array.from( document.URL.matchAll(reg_ec2_and_vpc) );
let captureGroupArrayLong = Array.from( document.URL.matchAll(reg_full) );

let domain = captureGroupArray[0][1];

if (domain !== "docs.aws.amazon.com") {
	let awsServiceName = captureGroupArray[0][2];

	// For Codesuite URLs (Codebuild/CodeDeploy/CodePipeline/etc...), we need to break the URL apart further to work
	if (awsServiceName == 'codesuite') {
		awsServiceName = captureGroupArray[0][3];
	}

    let awsService = awsServiceName + ".png";
	// We have found a match in the URL!
	    if (SERVICES.includes(awsServiceName)) {
			// Build the icon and shortcut icon tags so we can add them inside the head tag
			let iconNode = document.createElement('link');
			iconNode.setAttribute('rel', 'icon');
			iconNode.setAttribute('type', 'image/png');
			iconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));
			let shortcutIconNode = document.createElement('link');
			shortcutIconNode.setAttribute('rel', 'shortcut icon');
			shortcutIconNode.setAttribute('type', 'image/png');
			shortcutIconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));

			// Add the tags we just made to the head tag
			document.getElementsByTagName('head')[0].appendChild(iconNode);
			document.getElementsByTagName('head')[0].appendChild(shortcutIconNode);
		} else if(awsServiceName === 'ec2') {

			// There is a "v2" url for a bunch of these, and it flips on and off for no reason.  Check for this.

			let endOfURL = ""

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
			} else if (endOfURL.includes('NIC')) {
				awsServiceName = 'NIC';
			}

			// TODO: Make all this code a function
			let awsService = awsServiceName + ".png";

			let iconNode = document.createElement('link');
			iconNode.setAttribute('rel', 'icon');
			iconNode.setAttribute('type', 'image/png');
			iconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));
			let shortcutIconNode = document.createElement('link');
			shortcutIconNode.setAttribute('rel', 'shortcut icon');
			shortcutIconNode.setAttribute('type', 'image/png');
			shortcutIconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));

			document.getElementsByTagName('head')[0].appendChild(iconNode);
			document.getElementsByTagName('head')[0].appendChild(shortcutIconNode);

		} else if(awsServiceName === 'vpc') {

			let awsServiceName = captureGroupArrayEC2AndVPC[0][3];

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
			}	else {
				awsServiceName = 'vpc';
			}

			let awsService = awsServiceName + ".png";

			// TODO: Make all this code a function
			let iconNode = document.createElement('link');
			iconNode.setAttribute('rel', 'icon');
			iconNode.setAttribute('type', 'image/png');
			iconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));
			let shortcutIconNode = document.createElement('link');
			shortcutIconNode.setAttribute('rel', 'shortcut icon');
			shortcutIconNode.setAttribute('type', 'image/png');
			shortcutIconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));

			document.getElementsByTagName('head')[0].appendChild(iconNode);
			document.getElementsByTagName('head')[0].appendChild(shortcutIconNode);

		} else {
			// We have a favicon on the page, so just update the favicon tags

			// Get all the <link> tags
			let linkElements = document.getElementsByTagName('link');

			for (let i = 0; i < linkElements.length; i++) {
				// There are 2 tags that control the favicon.  Update them to be the correct favicon
				if (['icon', 'shortcut icon'].includes(linkElements[i].getAttribute('rel'))) {
					linkElements[i].setAttribute('type', 'image/png');
					linkElements[i].setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));
				}
			}
		}
}