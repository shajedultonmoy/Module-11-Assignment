```COMMANDS:


ubuntu@ip-10-0-11-151:~$ git clone https://github.com/shajedultonmoy/Module-11-Assignment.git
Cloning into 'Module-11-Assignment'...
remote: Enumerating objects: 15, done.
remote: Counting objects: 100% (15/15), done.
remote: Compressing objects: 100% (13/13), done.
remote: Total 15 (delta 1), reused 15 (delta 1), pack-reused 0 (from 0)
Receiving objects: 100% (15/15), 84.78 KiB | 12.11 MiB/s, done.
Resolving deltas: 100% (1/1), done.
ubuntu@ip-10-0-11-151:~$ ls
Module-11-Assignment
ubuntu@ip-10-0-11-151:~$ cd Module-11-Assignment/
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ ls
dist  index.html  npm.ps1  package-lock.json  package.json  src
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ curl -sfL https://get.k3s.io | sh -
[INFO]  Finding release for channel stable
[INFO]  Using v1.36.2+k3s1 as release
[INFO]  Downloading hash https://github.com/k3s-io/k3s/releases/download/v1.36.2%2Bk3s1/sha256sum-amd64.txt
[INFO]  Downloading binary https://github.com/k3s-io/k3s/releases/download/v1.36.2%2Bk3s1/k3s
[INFO]  Verifying binary download
[INFO]  Installing k3s to /usr/local/bin/k3s
[INFO]  Skipping installation of SELinux RPM
[INFO]  Creating /usr/local/bin/kubectl symlink to k3s
[INFO]  Creating /usr/local/bin/crictl symlink to k3s
[INFO]  Creating /usr/local/bin/ctr symlink to k3s
[INFO]  Creating killall script /usr/local/bin/k3s-killall.sh
[INFO]  Creating uninstall script /usr/local/bin/k3s-uninstall.sh
[INFO]  env: Creating environment file /etc/systemd/system/k3s.service.env
[INFO]  systemd: Creating service file /etc/systemd/system/k3s.service
[INFO]  systemd: Enabling k3s unit
Created symlink /etc/systemd/system/multi-user.target.wants/k3s.service → /etc/systemd/system/k3s.service.
[INFO]  systemd: Starting k3s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ 



ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ mkdir -p ~/.kube
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ sudo chown $(id -u):$(id -g) ~/.kube/config
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get nodes
WARN[0000] Unable to read /etc/rancher/k3s/k3s.yaml, please start server with --write-kubeconfig-mode or --write-kubeconfig-group to modify kube config permissions 
error: error loading config file "/etc/rancher/k3s/k3s.yaml": open /etc/rancher/k3s/k3s.yaml: permission denied
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get pods -n kube-system
WARN[0000] Unable to read /etc/rancher/k3s/k3s.yaml, please start server with --write-kubeconfig-mode or --write-kubeconfig-group to modify kube config permissions 
error: error loading config file "/etc/rancher/k3s/k3s.yaml": open /etc/rancher/k3s/k3s.yaml: permission denied
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ export KUBECONFIG=~/.kube/config
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ echo 'export KUBECONFIG=~/.kube/config' >> ~/.bashrc
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ sudo chmod 644 /etc/rancher/k3s/k3s.yaml
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get nodes
NAME             STATUS   ROLES           AGE     VERSION
ip-10-0-11-151   Ready    control-plane   3m16s   v1.36.2+k3s1
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get pods -n kube-system
NAME                                      READY   STATUS      RESTARTS        AGE
coredns-5f5694d56b-k5lwl                  1/1     Running     0               3m23s
helm-install-traefik-crd-5c8tn            0/1     Completed   0               3m20s
helm-install-traefik-dcxhf                0/1     Completed   2 (3m10s ago)   3m20s
local-path-provisioner-58d557dc48-mmrm6   1/1     Running     0               3m23s
metrics-server-7c86f97b8d-w4stw           1/1     Running     0               3m23s
svclb-traefik-f542ef06-hw4k7              2/2     Running     0               2m55s
traefik-6cd8c7cd89-kfsn9                  1/1     Running     0               2m55s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ 
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ nano app.yaml
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl apply -f app.yaml
deployment.apps/static-web-deploy created
service/static-web-service created
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   AGE
static-web-deploy-86754bdb65-2wzdm   1/1     Running   0          12s
static-web-deploy-86754bdb65-8nwj6   1/1     Running   0          12s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get deployment
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
static-web-deploy   2/2     2            2           26s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get svc
NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes           ClusterIP   10.43.0.1       <none>        443/TCP        5m55s
static-web-service   NodePort    10.43.168.147   <none>        80:30080/TCP   36s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ 

ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl exec -it <YOUR-POD-NAME> -- /bin/sh
-bash: YOUR-POD-NAME: No such file or directory
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   AGE
static-web-deploy-86754bdb65-2wzdm   1/1     Running   0          8m57s
static-web-deploy-86754bdb65-8nwj6   1/1     Running   0          8m57s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl exec -it static-web-deploy-86754bdb65-2wzdm -- /bin/sh
# env | grep -E 'APP_MODE|DB_PASSWORD'
# exit
command terminated with exit code 1
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ 
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl scale deployment static-web-deploy --replicas=4
deployment.apps/static-web-deploy scaled
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   AGE
static-web-deploy-86754bdb65-2wzdm   1/1     Running   0          12m
static-web-deploy-86754bdb65-8nwj6   1/1     Running   0          12m
static-web-deploy-86754bdb65-d97cx   1/1     Running   0          10s
static-web-deploy-86754bdb65-jzt48   1/1     Running   0          10s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl set image deployment/static-web-deploy nginx-container=nginx:1.25
deployment.apps/static-web-deploy image updated
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl rollout status deployment/static-web-deploy
deployment "static-web-deploy" successfully rolled out
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl rollout undo deployment/static-web-deploy
Warning: resource deployments/static-web-deploy was previously managed with 'kubectl apply'. Rolling back will not update the kubectl.kubernetes.io/last-applied-configuration annotation, which may cause unexpected behavior on future 'kubectl apply' operations. Consider using 'kubectl apply' with your previous configuration file instead.
deployment.apps/static-web-deploy rolled back
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ 
buntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl set image deployment/static-web-deploy nginx-container=nginx:fake-version
deployment.apps/static-web-deploy image updated
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get pods
NAME                                 READY   STATUS             RESTARTS   AGE
static-web-deploy-56fdbfdd8b-fd87x   0/1     ImagePullBackOff   0          16s
static-web-deploy-56fdbfdd8b-xxcqv   0/1     ImagePullBackOff   0          17s
static-web-deploy-86754bdb65-qc8xb   1/1     Running            0          65s
static-web-deploy-86754bdb65-wcggd   1/1     Running            0          64s
static-web-deploy-86754bdb65-wnc9q   1/1     Running            0          64s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl describe pod <BROKEN-POD-NAME>
-bash: syntax error near unexpected token `newline'
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl describe pod static-web-deploy-56fdbfdd8b-fd87x
Name:             static-web-deploy-56fdbfdd8b-fd87x
Namespace:        default
Priority:         0
Service Account:  default
Node:             ip-10-0-11-151/10.0.11.151
Start Time:       Sat, 04 Jul 2026 05:20:39 +0000
Labels:           app=static-web
                  pod-template-hash=56fdbfdd8b
Annotations:      <none>
Status:           Pending
IP:               10.42.0.22
IPs:
  IP:           10.42.0.22
Controlled By:  ReplicaSet/static-web-deploy-56fdbfdd8b
Containers:
  nginx-container:
    Container ID:   
    Image:          nginx:fake-version
    Image ID:       
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Waiting
      Reason:       ErrImagePull
    Ready:          False
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /usr/share/nginx/html from web-content (rw)
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-crgrw (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True 
  Initialized                 True 
  Ready                       False 
  ContainersReady             False 
  PodScheduled                True 
Volumes:
  web-content:
    Type:          HostPath (bare host directory volume)
    Path:          /home/ubuntu/Module-11-Assignment
    HostPathType:  
  kube-api-access-crgrw:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    Optional:                false
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason     Age                 From               Message
  ----     ------     ----                ----               -------
  Normal   Scheduled  108s                default-scheduler  Successfully assigned default/static-web-deploy-56fdbfdd8b-fd87x to ip-10-0-11-151
  Normal   Pulling    19s (x4 over 108s)  kubelet            spec.containers{nginx-container}: Pulling image "nginx:fake-version"
  Warning  Failed     19s (x4 over 108s)  kubelet            spec.containers{nginx-container}: Failed to pull image "nginx:fake-version": rpc error: code = NotFound desc = failed to pull and unpack image "docker.io/library/nginx:fake-version": failed to resolve reference "docker.io/library/nginx:fake-version": docker.io/library/nginx:fake-version: not found
  Warning  Failed     19s (x4 over 108s)  kubelet            spec.containers{nginx-container}: Error: ErrImagePull
  Normal   BackOff    7s (x6 over 108s)   kubelet            spec.containers{nginx-container}: Back-off pulling image "nginx:fake-version"
  Warning  Failed     7s (x6 over 108s)   kubelet            spec.containers{nginx-container}: Error: ImagePullBackOff
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl logs static-web-deploy-56fdbfdd8b-fd87x
Error from server (BadRequest): container "nginx-container" in pod "static-web-deploy-56fdbfdd8b-fd87x" is waiting to start: trying and failing to pull image
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl rollout undo deployment/static-web-deploy
Warning: resource deployments/static-web-deploy was previously managed with 'kubectl apply'. Rolling back will not update the kubectl.kubernetes.io/last-applied-configuration annotation, which may cause unexpected behavior on future 'kubectl apply' operations. Consider using 'kubectl apply' with your previous configuration file instead.
deployment.apps/static-web-deploy rolled back
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ 
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl create namespace dev-env
namespace/dev-env created
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl apply -f app.yaml -n dev-env
Error from server (Invalid): error when creating "app.yaml": Deployment.apps "static-web-deploy" is invalid: spec.template.spec.containers[0].volumeMounts[0].name: Not found: "web-content"
Error from server (Invalid): error when creating "app.yaml": Service "static-web-service" is invalid: spec.ports[0].nodePort: Invalid value: 30080: provided port is already allocated
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl apply -f config-secret.yaml -n dev-env
configmap/app-configmap created
secret/app-secret created
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ nano app-dev.yaml
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl apply -f app-dev.yaml -n dev-env
deployment.apps/static-web-deploy created
service/static-web-service created
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   AGE
static-web-deploy-86754bdb65-ks9ct   1/1     Running   0          5m45s
static-web-deploy-86754bdb65-qc8xb   1/1     Running   0          8m48s
static-web-deploy-86754bdb65-wcggd   1/1     Running   0          8m47s
static-web-deploy-86754bdb65-wnc9q   1/1     Running   0          8m47subuntu@ip-10-0-11-151:~/Module-11-Assignment$ nano app-dev.yaml
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl apply -f app-dev.yaml -n dev-env
deployment.apps/static-web-deploy configured
service/static-web-service unchanged
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ 

ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ kubectl get pods -n dev-env
NAME                                 READY   STATUS    RESTARTS   AGE
static-web-deploy-7bd589f474-8zb5q   1/1     Running   0          24s
static-web-deploy-7bd589f474-bzbv4   1/1     Running   0          24s
ubuntu@ip-10-0-11-151:~/Module-11-Assignment$ 
