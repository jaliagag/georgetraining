# summary

The **Kubernetes cluster** consists of a set of nodes which may be physical or virtual, on-premise or on cloud, that host applications in the form of containers.

Etcd is a database that stores information in a key-value format.

schedulers in a Kubernetes cluster as scheduler **identifies the right node to place a container on based on the containers resource requirements**, the worker nodes capacity or any other policies or constraints such as taints and tolerations or node affinity  rules that are on them.

The **node-controller** takes care of nodes. They're responsible for onboarding new nodes to the cluster handling situations where nodes become unavailable or get destroyed and the **replication controller** ensures that the desired number of containers are running at all times in your replication group.

The kube-apiserver is the primary management component of kubernetes. The kube-api server is responsible for orchestrating all operations within the cluster. _It exposes the Kubernetes API which is used by externals users to perform management operations_

software that can run containers and that's the container runtime engine. A popular one being Docker. So we need Docker or it's supported equivalent installed on all the nodes in the cluster including the master nodes

kubelet in Kubernetes. A kubelet is an agent that runs on each node in a cluster. It listens for instructions from the kube-api server and deploys or destroys containers on the nodes as required. The kube-api server periodically fetches status reports from the kubelet to monitor the state of nodes and containers on them.

Communication between worker nodes are enabled by another component that runs on the worker node known as the Kube-proxy service. The Kube-proxy service ensures that the necessary rules are in place on the worker nodes to allow the containers running on them to reach each other.

- **master** and **worker nodes**
  - on the master. We have the
    - **ETCD cluster** which stores information about the cluster
    - the **Kube scheduler** that is responsible for scheduling applications or containers on Nodes
    - We have different controllers that take care of different functions like the node control, replication, controller etc..
    - we have the **Kube api server** that is responsible for orchestrating all operations within the cluster.
  - on the worker node.
    - we have the **kubelet** that listens for  instructions from the Kube-apiserver and manages containers and
    - the **kube-proxy** That helps in enabling communication between services within the cluster.

## ETCD

etcdctl --> command to interact with etcd key-value store: `etcdctl set key1 value1`. to get data: `etcdctl get key1`.

The ETCD datastore stores information regarding the cluster such as the nodes, pods, configs, secrets, accounts, roles, bindings and others.

_Every information you see when you run the kubectl get command is from the ETCD server_. Every change you make to your cluster, such as adding additional nodes, deploying pods or replica sets are updated in the ETCD  server. Only once it is updated in the ETCD server, is the change considered to be complete.

## kube-apiserver

When you run a `kubectl command`, **the kubectl utility is infact reaching to the kube-apiserver**. The kube-api server first authenticates the request and validates it. It then retrieves the data from the ETCD cluster and responds back with the requested information.

If you set it up with kubeadm tool, kubeadm deploys the kube-api server as a pod in the kube-system namespace on the master node you can see the options within the pod definition file located at /etc/kubernetes/manifests folder.

In a non kubeadm setup, we can view the options of the kube-apiserver service located at /etc/systemd/system/kube-apiserver.service.You can also see the running process and the effective options by listing the process on the master node and searching for kube-apiserver `ps aux | grep kube-apiserver`.

## kube controller manger

In the kubernetes terms a controller is a process that continuously monitors the state of various components within the system and works towards bringing the whole system to the desired functioning state

- node controller: responsible for monitoring the status of the nodes and taking necessary actions to keep the appliction running (done through the api server)
- replication controller: monitoring replica sets - if a pod dies it creates another one

_They're all packaged into a single process known as_ **kubernetes controller manager**

## kube scheduler

Only responsible for deciding which pod goes on which nodes; it doesn't place the pods on the nodes. that's the job of the kubelet; the kubelet, the captain of the ships, is who creates the pods on the ships.

## kubelet

the kubelet in the worker nodes registers the nodes with the k8s cluster. when it receives instruction to load a container or pod on the nodes, it requests the container runtime engine to pull the required image and run an instance of it.

The kubelet also monitors the status of the POD and containers in it and reports to the kube-api server.

## kube proxy

kube-proxy is a process that runs on each node in the k8s cluster. it's job is to look for new services and each time a new service is created, it creates the appropriate rule to forward traffic to those services to the backend pods by using ip table rules.

## replica sets

**The role of the replica set** is to monitor the pod and in case any on them were to fail, deploy new ones. the rs is a process that monitors the pod. the replica set knows which pod to monitor through the labels attached to pods, defined under the selector field.

## deployments

deployments are k8s objects that are higher than replicasets. it allows for seamless update of the app. the deployment creates a replica set (get deployments = 1, get replicasets = 1) which create pods.

## namespaces

resources on namespaces are isolated. namespaces can have different sets of policies assigned, to define who can do what. you can also assign quotas/limits of resources to the namespaces.

to limi resources in a ns, create a **resource quota**.

## services

services enable communication between components and outside the app. they help us connect apps with other apps/users.

- <https://kubernetes.io/docs/concepts/overview/components/>

## services

- node-port: the service makes an internal port accesible on a port on the node
- clusterIP: the service creates a virtual IP inside the cluster to enable communication between services, for instance, fron end and backend servers
- load balancer: it creates a load balancer for our app in supported cloud providers
