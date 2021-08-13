pragma solidity >=0.4.24 <0.7.0;
contract Voting{
    bytes32[] public candidateList; //候选人数组
    mapping(bytes32 => uint) public votesReceived;  
    constructor(bytes32[] candidateListName) public{
        candidateList = candidateListName;
    }
    
    //检测是否为有效的投票地址
    function validateCandidate(bytes32 candidateName) internal view returns(bool){
        for(uint i = 0; i < candidateList.length; i++){
            if (candidateName == candidateList[i])
                return true;
        }
        return false;
    }

    //投票函数
    function vote(bytes32 candidateName) public {
        require(validateCandidate(candidateName));
        votesReceived[candidateName] += 1;
    }

    //返回某个候选人的得票
    function totalVotesFor(bytes32 candidateName) public view returns(uint){
        require(validateCandidate(candidateName));
        return votesReceived[candidateName];
    }

}
// 45079/10^18 *2400 *6.4